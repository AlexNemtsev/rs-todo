import Builder from '../builder/builder';
import './tasksView.scss';

class TasksView {
  public static draw(main: HTMLElement) {
    main.innerHTML = '';

    const [container, ...rest] = [
      ['container'],
      ['lists'],
      ['tasks'],
      ['details'],
    ].map((item) => Builder.createBlock(item));

    container.append(...rest);
    main.append(container);
  }
}

export default TasksView;
