/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import Utils from '../../../utils/utils';
import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import Router from '../../logic/router';

class ListColumn {
  static listItems: HTMLElement[] = [];

  static listName: string;

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

    listsBlock.append(periodList, bottomList);
    ListColumn.addChangeListHandler(listsBlock);
  }

  private static createList(
    listClasses: string[],
    itemNames: string[],
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

        el.innerHTML = `
          <img class="list__icon" src="./assets/img/list-${item}.svg" alt="${i18next.t(
          `mainScreen.lists.${item}`,
        )}">
          ${i18next.t(`mainScreen.lists.${item}`)}
        `;

        ListColumn.listItems.push(el);
        return el;
      },
    );

    list.append(...items);
    return list;
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
}

export default ListColumn;
