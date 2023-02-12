import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';

class ContextMenu {
  menu: HTMLElement;

  constructor() {
    this.menu = Builder.createBlock(['context-menu'], 'ul');
  }

  public draw(): HTMLElement {
    this.menu.append(ContextMenu.createDatesMenu());

    const actions: string[] = ['duplicate', 'delete'];
    actions.forEach((action: string): void => {
      const item: HTMLElement = Builder.createBlock(
        ['context-menu__item'],
        'li',
        `${i18next.t(`mainScreen.tasks.${action}`)}`,
      );
      item.dataset.action = action;
      this.menu.append(item);
    });

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
      dateItem.title = item;
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

  public addListener(): void {
    this.menu.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const taskId = Number(e.target.parentElement?.dataset.id);

        switch (e.target.dataset.action) {
          case 'duplicate':
            Loader.duplicateTask(taskId).catch((error) => {
              console.error('Error:', error);
            });
            break;
          case 'delete':
            Loader.updateTask(taskId, { removed: true }).catch((error) => {
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
