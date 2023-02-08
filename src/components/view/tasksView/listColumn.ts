import i18next from 'i18next';

class ListColumn {
  public static draw(listsBlock: HTMLElement): void {
    listsBlock.innerHTML = `
      <ul class="list">
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/calendar.svg" alt="Calendar">
            ${i18next.t('mainScreen.lists.today')}
          </button>
        </li>
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/calendar.svg" alt="Calendar">
            ${i18next.t('mainScreen.lists.tomorrow')}
          </button>
        </li>
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/calendar7.svg" alt="Calendar">
            ${i18next.t('mainScreen.lists.nextDays')}
          </button>
        </li>
      </ul>
      <ul class="list list--main">
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/task.svg" alt="Completed tasks">
            ${i18next.t('mainScreen.lists.completed')}
          </button>
        </li>
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/trash.svg" alt="Trash">
            ${i18next.t('mainScreen.lists.trash')}
          </button>
        </li>
      </ul>
    `;
  }
}

export default ListColumn;
