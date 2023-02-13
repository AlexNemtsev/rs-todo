import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import Observable from '../../logic/observable';

class ContextMenu {
  menu: HTMLElement;

  constructor() {
    this.menu = Builder.createBlock(['context-menu'], 'ul');
  }

  public draw(): HTMLElement {
    this.menu.append(
      ContextMenu.createDatesMenu(),
      ...ContextMenu.createTextItems(),
    );
    this.addListener();

    return this.menu;
  }

  public show() {
    this.menu.classList.add('context-menu--active');
  }

  public hide() {
    this.menu.classList.remove('context-menu--active');
  }

  private static createDatesMenu(): HTMLElement {
    const dateBlock: HTMLElement = Builder.createBlock(
      ['context-menu__item', 'context-menu__item--dates'],
      'li',
    );
    const dateList: HTMLElement = Builder.createBlock(['dates'], 'ul');
    const dateItems: HTMLElement[] = [
      'today',
      'tomorrow',
      'week',
      'custom',
    ].map((item: string) => {
      const dateItem: HTMLElement = Builder.createBlock(['dates__item'], 'li');
      dateItem.title = i18next.t(`mainScreen.tasks.${item}`);
      dateItem.innerHTML = `
        <img class="dates__icon" src="./assets/img/${item}.svg" alt="${i18next.t(
        `mainScreen.tasks.${item}`,
      )}">
      `;
      return dateItem;
    });
    dateList.append(...dateItems);
    dateBlock.append(dateList);

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

  public addListener(): void {
    this.menu.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const taskId = Number(e.target.parentElement?.dataset.id);

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
          default:
            break;
        }
      }
    });
  }
}

export default ContextMenu;
