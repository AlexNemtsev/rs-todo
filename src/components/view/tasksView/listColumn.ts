/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import Utils from '../../../utils/utils';
import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import Router from '../../logic/router';
import Loader from '../../logic/loader';

class ListColumn {
  static listItems: HTMLElement[] = [];

  static listName: string;

  static customListBlock: HTMLElement;

  static addListModal: HTMLDialogElement;

  public static draw(listsBlock: HTMLElement, listName?: string): void {
    ListColumn.listItems = [];
    if (listName) ListColumn.listName = listName;

    const periodList: HTMLElement = ListColumn.createList(
      ['list'],
      ['all', 'today', 'tomorrow', 'nextDays'],
    );
    const bottomList: HTMLElement = ListColumn.createList(
      ['list', 'list--main'],
      ['completed', 'trash'],
    );

    ListColumn.createCustomListBlock();
    ListColumn.addListModal = ListColumn.createAddListModal();

    listsBlock.append(
      periodList,
      ListColumn.customListBlock,
      bottomList,
      ListColumn.addListModal,
    );
    ListColumn.addChangeListHandler(listsBlock);
  }

  private static createList(
    listClasses: string[],
    itemNames: string[],
    isCustom = false,
  ): HTMLElement {
    const list: HTMLElement = Builder.createBlock(listClasses, 'ul');

    const items: HTMLElement[] = itemNames.map(
      (item: string): HTMLElement => {
        const el: HTMLElement = Builder.createLink(
          ['list__item'],
          `/tasks/${item}`,
        );
        if (ListColumn.listName) {
          if (item === ListColumn.listName)
            el.classList.add('list__item--active');
        } else if (item === 'all') {
          el.classList.add('list__item--active');
        }

        const pathName: string = isCustom ? 'custom' : item;
        const elName: string = isCustom
          ? item
          : i18next.t(`mainScreen.lists.${item}`);

        el.innerHTML = `
            <img class="list__icon" src="./assets/img/list-${pathName}.svg" alt="${elName}">
            ${elName}
          `;

        ListColumn.listItems.push(el);
        return el;
      },
    );

    list.append(...items);
    return list;
  }

  private static createCustomListBlock(): void {
    const customListBlock: HTMLElement = Builder.createBlock(['lists__custom']);
    const customListTitle: HTMLElement = Builder.createBlock(
      ['lists__title'],
      'h3',
      `${i18next.t('mainScreen.lists.listsTitle')}`,
    );

    const customListButton: HTMLElement = Builder.createBlock(
      ['lists__button'],
      'button',
      '+',
    );
    ListColumn.addListButtonHandler(customListButton);

    customListBlock.append(customListTitle, customListButton);

    ListColumn.customListBlock = customListBlock;
    ListColumn.renderCustomLists();
  }

  private static renderCustomLists(): void {
    Loader.getLists()
      .then((data) => {
        const customListNames: string[] = data.map((item) => item.name);
        const customLists: HTMLElement = ListColumn.createList(
          ['list'],
          customListNames,
          true,
        );
        if (ListColumn.customListBlock.children.length > 2) {
          ListColumn.customListBlock.replaceChild(
            customLists,
            ListColumn.customListBlock.childNodes[2],
          );
        } else {
          ListColumn.customListBlock.append(customLists);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private static addChangeListHandler(listsBlock: HTMLElement): void {
    listsBlock.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        e.preventDefault();
        const listItem: HTMLElement | null = Utils.findByClass(
          e.target,
          'list__item',
        );
        if (
          listItem instanceof HTMLAnchorElement &&
          !listItem.classList.contains('list__item--active')
        ) {
          Router.setRoute(listItem.href);
          TaskColumn.fillTaskList();
        }
      }
    });
  }

  private static addListButtonHandler(button: HTMLElement): void {
    button.addEventListener('click', () => {
      ListColumn.addListModal.showModal();
    });
  }

  private static createAddListModal(): HTMLDialogElement {
    const modal: HTMLDialogElement = document.createElement('dialog');
    modal.classList.add('modal');
    modal.innerHTML = `
      <button class="modal__button modal__button--close">✕</button>
      <div class="modal__inner">
        <h3 class="modal__title">${i18next.t('mainScreen.lists.addList')}</h3>
        <input class="modal__input" type="text" placeholder="${i18next.t(
          'mainScreen.lists.addListPlaceholder',
        )}">
        <button class="modal__button modal__button--save">${i18next.t(
          'mainScreen.lists.save',
        )}</button>
      </div>
    `;

    ListColumn.addModalListener(modal);

    return modal;
  }

  private static addModalListener(modal: HTMLDialogElement): void {
    modal.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLButtonElement) {
        if (e.target.classList.contains('modal__button--save')) {
          const modalInput = ListColumn.addListModal.querySelector(
            '.modal__input',
          ) as HTMLInputElement;
          if (modalInput.value !== '') {
            console.log(modalInput.value);
            Loader.createTaskList({ name: modalInput.value })
              .then(() => {
                ListColumn.renderCustomLists();
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }

        ListColumn.addListModal.close();
      }
    });
  }
}

export default ListColumn;
