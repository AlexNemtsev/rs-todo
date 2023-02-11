import i18next from 'i18next';
import Builder from '../builder/builder';

class ContextMenu {
  menu: HTMLElement;

  constructor() {
    this.menu = Builder.createBlock(['context-menu'], 'ul');
  }

  public draw(): HTMLElement {
    const actions: string[] = ['duplicate', 'delete'];
    actions.forEach((action: string): void => {
      const item: HTMLElement = Builder.createBlock(
        ['context-menu__item'],
        'li',
        `${i18next.t(`mainScreen.lists.${action}`)}`,
      );
      item.dataset.action = action;
      this.menu.append(item);
    });

    return this.menu;
  }

  public show() {
    this.menu.classList.add('context-menu--active');
  }

  public hide() {
    this.menu.classList.remove('context-menu--active');
  }
}

export default ContextMenu;
