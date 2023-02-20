/* eslint-disable import/no-cycle */
import Router from '../router';
import showDescription from '../../view/tasksView/show-description';

const onTaskClickHandler = (event: Event, id: number): void => {
  const target = (event.target as HTMLElement).closest(
    '.task',
  ) as HTMLDivElement;

  Router.setRoute(target.dataset.href ?? '');

  showDescription(id).catch((err) => console.log(err));
};

export default onTaskClickHandler;
