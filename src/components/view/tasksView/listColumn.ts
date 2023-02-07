import i18next from 'i18next';

class ListColumn {
  public static draw(listsBlock: HTMLElement): void {
    listsBlock.innerHTML = `
      <ul class="list">
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/calendar.svg" alt="Calendar">
            Today
          </button>
        </li>
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/calendar.svg" alt="Calendar">
            Tomorrow
          </button>
        </li>
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/calendar7.svg" alt="Calendar">
            Next 7 Days
          </button>
        </li>
      </ul>
      <ul class="list list--main">
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/task.svg" alt="Completed tasks">
            Completed
          </button>
        </li>
        <li class="list__item">
          <button class="list__button">
            <img class="list__icon" src="./assets/img/trash.svg" alt="Trash">
            ${i18next.t('trash-list')}
          </button>
        </li>
      </ul>
    `;
  }
}

export default ListColumn;
