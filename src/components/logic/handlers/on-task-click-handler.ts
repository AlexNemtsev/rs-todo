// eslint-disable-next-line import/no-cycle
import Router from '../router';

const onTaskClickHandler = (event: Event): void => {
  const target = event.target as HTMLElement;

  if (target.classList.contains('task__label')) return;
  if (target.classList.contains('task__input')) return;

  const closestDiv = (event.target as HTMLElement).closest(
    '.task',
  ) as HTMLDivElement;

  Router.setRoute(closestDiv.dataset.href ?? '');
};

export default onTaskClickHandler;
