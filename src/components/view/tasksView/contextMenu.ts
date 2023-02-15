import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import Observable from '../../logic/observable';
import Utils from '../../../utils/utils';

class ContextMenu {
  menu: HTMLElement;

  customDateInput: HTMLElement;

  constructor() {
    this.menu = Builder.createBlock(['context-menu'], 'ul');
    this.customDateInput = Builder.createBlock(['dates__item'], 'li');
  }

  public draw(): HTMLElement {
    this.menu.append(this.createDatesMenu(), ...ContextMenu.createTextItems());
    this.addListener();

    return this.menu;
  }

  public show() {
    this.menu.classList.add('context-menu--active');
  }

  public hide() {
    this.menu.classList.remove('context-menu--active');
  }

  private createDatesMenu(): HTMLElement {
    const dateBlock: HTMLElement = Builder.createBlock(
      ['context-menu__item', 'context-menu__item--dates'],
      'li',
    );
    const dateList: HTMLElement = Builder.createBlock(['dates'], 'ul');
    const dateItems: HTMLElement[] = ['today', 'tomorrow', 'week'].map(
      (item: string) => {
        const dateItem: HTMLElement = Builder.createBlock(
          ['dates__item'],
          'li',
        );
        dateItem.title = i18next.t(`mainScreen.tasks.${item}`);
        dateItem.innerHTML = `
        <img class="dates__icon" src="./assets/img/${item}.svg" data-action="${item}" alt="${i18next.t(
          `mainScreen.tasks.${item}`,
        )}">
      `;
        return dateItem;
      },
    );

    this.customDateInput.innerHTML = `
      <input class="dates__input" type="date" id="custom-data" data-action="custom">
    `;

    dateList.append(...dateItems, this.customDateInput);
    dateBlock.append(dateList);

    this.addCustomDateListener();

    return dateBlock;
  }

  private static createTextItems(): HTMLElement[] {
    const actions: string[] = ['duplicate', 'delete'];
    const items: HTMLElement[] = actions.map(
      (action: string): HTMLElement => {
        const item: HTMLElement = Builder.createBlock(
          ['context-menu__item'],
          'li',
          `${i18next.t(`mainScreen.tasks.${action}`)}`,
        );
        item.dataset.action = action;

        return item;
      },
    );

    return items;
  }

  private addListener(): void {
    this.menu.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const taskId = Number(
          Utils.findByClass(e.target, 'context-menu')?.dataset.id,
        );

        switch (e.target.dataset.action) {
          case 'duplicate':
            Loader.duplicateTask(taskId)
              .then(() => Observable.notify())
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          case 'delete':
            Loader.updateTask(taskId, { removed: true })
              .then(() => Observable.notify())
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          case 'today':
            Loader.updateTask(taskId, { dueTo: Utils.getDayEndInMs(0) })
              .then(() => Observable.notify())
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          case 'tomorrow':
            Loader.updateTask(taskId, { dueTo: Utils.getDayEndInMs(1) })
              .then(() => Observable.notify())
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          case 'week':
            Loader.updateTask(taskId, { dueTo: Utils.getDayEndInMs(7) })
              .then(() => Observable.notify())
              .catch((error) => {
                console.error('Error:', error);
              });
            break;
          default:
            break;
        }
      }
    });
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
}

export default ContextMenu;