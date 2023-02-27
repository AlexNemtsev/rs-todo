/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import Utils from '../../../utils/utils';
import Builder from '../builder/builder';
import Router from '../../logic/router';
import Loader from '../../logic/loader';
import TaskList from '../../../interfaces/task-List';
import ContextMenu from './contextMenu';
import ListModal from './listModal';

class ListColumn {
  private static listItems: HTMLElement[] = [];

  private static listName: string;

  private static customListBlock: HTMLElement;

  public static menu: ContextMenu;

  private static menuBlock: HTMLElement;

  private static cachedListData: TaskList[];

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

    ListColumn.menu = new ContextMenu('list');
    ListColumn.menuBlock = ListColumn.menu.draw();

    listsBlock.append(
      periodList,
      ListColumn.customListBlock,
      bottomList,
      ListModal.createListModal(),
      ListColumn.menuBlock,
    );
    ListColumn.addChangeListHandler(listsBlock);
  }

  private static createList(
    listClasses: string[],
    itemNames: string[],
    isCustom = false,
    itemIDs?: number[],
  ): HTMLElement {
    const list: HTMLElement = Builder.createBlock(listClasses, 'ul');

    const items: HTMLElement[] = itemNames.map(
      (item: string, index: number): HTMLElement => {
        const href = isCustom && itemIDs ? `custom-${itemIDs[index]}` : item;
        const classes = isCustom
          ? ['list__item', 'list__item--custom']
          : ['list__item'];
        const el: HTMLElement = Builder.createLink(classes, `/tasks/${href}`);
        if (ListColumn.listName) {
          if (href === ListColumn.listName)
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

  public static renderCustomLists(): void {
    function render(data: TaskList[]) {
      const customListNames = data.map((item) => item.name);
      const customListIDs = data.map((item) => item.id);
      const customLists: HTMLElement = ListColumn.createList(
        ['list'],
        customListNames,
        true,
        customListIDs,
      );
      if (ListColumn.customListBlock.children.length > 2) {
        ListColumn.customListBlock.replaceChild(
          customLists,
          ListColumn.customListBlock.childNodes[2],
        );
      } else {
        ListColumn.customListBlock.append(customLists);
      }
    }

    if (ListColumn.cachedListData) render(ListColumn.cachedListData);

    Loader.getLists()
      .then((data: TaskList[]) => {
        ListColumn.cachedListData = data;
        render(data);
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
        }
      }
    });
  }

  private static addListButtonHandler(button: HTMLElement): void {
    button.addEventListener('click', ListModal.showAddModal);
  }
}

export default ListColumn;
