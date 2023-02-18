import i18next from 'i18next';
import Utils from '../../../utils/utils';
import Builder from '../builder/builder';
import TaskColumn from './taskColumn';

class ListColumn {
  static listItems: HTMLElement[] = [];

  public static draw(listsBlock: HTMLElement): void {
    ListColumn.listItems = [];

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
        const el: HTMLElement = Builder.createBlock(['list__item'], 'li');
        if (item === 'all') el.classList.add('list__item--active');
        el.dataset.list = item;

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
        const listItem: HTMLElement | null = Utils.findByClass(
          e.target,
          'list__item',
        );
        if (listItem && !listItem.classList.contains('list__item--active')) {
          ListColumn.listItems.forEach((item: HTMLElement) => {
            item.classList.remove('list__item--active');
          });
          listItem.classList.add('list__item--active');
          TaskColumn.fillTaskList(listItem.dataset.list);
        }
      }
    });
  }
}

export default ListColumn;
