/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import Observable from '../../logic/observable';
import Utils from '../../../utils/utils';
import TaskList from '../../../interfaces/task-List';
import Router from '../../logic/router';
import ListModal from './listModal';
import Priority from '../../../interfaces/priority';

class ContextMenu {
  type: 'task' | 'list';

  menu: HTMLElement;

  customDateInput: HTMLElement;

  submenu: HTMLElement;

  constructor(type: 'task' | 'list') {
    this.type = type;
    this.menu = Builder.createBlock(['context-menu'], 'ul');
    this.customDateInput = Builder.createBlock(['menu-row__item'], 'li');
    this.submenu = Builder.createBlock(['context-menu__submenu'], 'ul');
  }

  public draw(): HTMLElement {
    this.menu.innerHTML = '';
    if (this.type === 'task') {
      this.menu.append(
        this.createMenuRow(['today', 'tomorrow', 'week'], true),
        this.createMenuRow(['high', 'medium', 'low', 'none']),
        ...this.createTextItems(this.type),
      );
    } else {
      this.menu.append(...this.createTextItems(this.type));
    }
    this.addListener(this.type);

    return this.menu;
  }

  public show(id: number, e: MouseEvent) {
    this.menu.dataset.id = id.toString();
    if (e.clientY > window.innerHeight / 2) {
      this.menu.style.top = 'auto';
      this.menu.style.bottom = `${window.innerHeight - e.clientY}px`;
      this.menu.classList.add('context-menu--bottom');
    } else {
      this.menu.style.top = `${e.clientY}px`;
      this.menu.style.bottom = 'auto';
      this.menu.classList.remove('context-menu--bottom');
    }
    this.menu.style.left = `${e.clientX}px`;
    this.menu.classList.add('context-menu--active');
  }

  public hide() {
    this.menu.classList.remove('context-menu--active');
  }

  private createMenuRow(values: string[], isDate = false): HTMLElement {
    const block: HTMLElement = Builder.createBlock(
      ['context-menu__item', 'context-menu__item--row'],
      'li',
    );
    const list: HTMLElement = Builder.createBlock(['menu-row'], 'ul');
    const items: HTMLElement[] = values.map((value: string) => {
      const item: HTMLElement = Builder.createBlock(['menu-row__item'], 'li');
      item.title = i18next.t(`mainScreen.tasks.${value}`);
      item.innerHTML = `
        <img class="menu-row__icon" src="./assets/img/${value}.svg" data-action="${value}" alt="${i18next.t(
        `mainScreen.tasks.${value}`,
      )}">
      `;
      return item;
    });

    list.append(...items);
    block.append(list);

    if (isDate) this.createMenuDateInput(list);

    return block;
  }

  private createMenuDateInput(list: HTMLElement): void {
    this.customDateInput.innerHTML = `
      <input class="menu-row__date-input" type="date" id="custom-data" data-action="custom">
    `;
    list.append(this.customDateInput);
    this.addCustomDateListener();
  }

  private createTextItems(type: 'task' | 'list'): HTMLElement[] {
    let actions: string[] = ['duplicate', 'delete', 'move'];
    if (type === 'list') actions = ['edit', 'delete'];
    const items: HTMLElement[] = actions.map(
      (action: string): HTMLElement => {
        const item: HTMLElement = Builder.createBlock(
          ['context-menu__item'],
          'li',
          `${i18next.t(`mainScreen.tasks.${action}`)}`,
        );
        item.dataset.action = action;

        if (action === 'move') {
          this.createListSubmenu();
          item.classList.add('context-menu__item--select');
          item.append(this.submenu);
        }

        return item;
      },
    );

    return items;
  }

  private addListener(type: 'task' | 'list'): void {
    this.menu.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const itemId = Number(
          Utils.findByClass(e.target, 'context-menu')?.dataset.id,
        );
        const action = String(e.target.dataset.action);

        if (type === 'task') {
          ContextMenu.handleTaskActions(action, itemId)
            .then(() => Observable.notify())
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          ContextMenu.handleListActions(action, itemId)
            .then(() => Observable.notify())
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      }
    });
  }

  private static async handleTaskActions(action: string, itemId: number) {
    switch (action) {
      case 'duplicate':
        await Loader.duplicateTask(itemId);
        break;
      case 'delete':
        await Loader.updateTask(itemId, { removed: true });
        break;
      case 'today':
        await Loader.updateTask(itemId, { dueTo: Utils.getDayEndInMs(0) });
        break;
      case 'tomorrow':
        await Loader.updateTask(itemId, { dueTo: Utils.getDayEndInMs(1) });
        break;
      case 'week':
        await Loader.updateTask(itemId, { dueTo: Utils.getDayEndInMs(7) });
        break;
      case 'high':
        await Loader.updateTask(itemId, { priority: Priority.high });
        break;
      case 'medium':
        await Loader.updateTask(itemId, { priority: Priority.medium });
        break;
      case 'low':
        await Loader.updateTask(itemId, { priority: Priority.low });
        break;
      case 'none':
        await Loader.updateTask(itemId, { priority: Priority.none });
        break;
      default:
        break;
    }
  }

  private static async handleListActions(action: string, itemId: number) {
    switch (action) {
      case 'edit':
        Loader.getList(itemId)
          .then((list: TaskList) => {
            ListModal.showEditModal(list);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        break;
      case 'delete':
        await Loader.deleteTaskList(itemId);
        Router.setRoute('/tasks/all');
        break;
      default:
        break;
    }
  }

  private addCustomDateListener(): void {
    this.customDateInput.addEventListener('change', (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        const endDate = new Date(e.target.value).setHours(23, 59, 59, 999);
        const taskId = Number(
          Utils.findByClass(e.target, 'context-menu')?.dataset.id,
        );

        Loader.updateTask(taskId, { dueTo: +endDate })
          .then(() => {
            Observable.notify();
            this.hide();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }

  private createListSubmenu() {
    this.submenu.innerHTML = '';
    Loader.getLists()
      .then((data: TaskList[]) => {
        data.forEach((item) => {
          const listItem = Builder.createBlock(
            ['context-menu__item'],
            'li',
            item.name,
          );
          listItem.dataset.id = item.id.toString();
          this.submenu.append(listItem);
        });
        this.addListSubmenuListener();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  private addListSubmenuListener() {
    this.submenu.addEventListener('click', (e) => {
      if (e.target instanceof HTMLLIElement) {
        const listID = Number(e.target.dataset.id);
        const taskId = Number(
          Utils.findByClass(e.target, 'context-menu')?.dataset.id,
        );

        Loader.updateTask(taskId, { listId: listID })
          .then(() => {
            Observable.notify();
            this.hide();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }
}

export default ContextMenu;
