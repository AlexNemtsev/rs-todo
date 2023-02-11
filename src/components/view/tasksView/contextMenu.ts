import Builder from '../builder/builder';

class ContextMenu {
  menu: HTMLElement;

  constructor() {
    this.menu = Builder.createBlock(['context-menu'], 'ul');
  }

  public draw(): HTMLElement {
    this.menu.innerHTML = `
      <li class="context-menu__item">Duplicate</li>
      <li class="context-menu__item">Delete</li>
    `;

    return this.menu;
  }

  public show() {
    this.menu.classList.add('context-menu--active')
  }

  public hide() {
    this.menu.classList.remove('context-menu--active')
  }
}

export default ContextMenu;
