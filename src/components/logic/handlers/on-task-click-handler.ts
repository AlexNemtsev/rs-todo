// eslint-disable-next-line import/no-cycle
import Router from '../router';

const onTaskClickHandler = (event: Event): void => {
  const target = (event.target as HTMLElement).closest(
    '.task',
  ) as HTMLDivElement;

  Router.setRoute(target.dataset.href ?? '');
};

export default onTaskClickHandler;
