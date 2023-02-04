import Builder from '../builder/builder';
import './tasksView.scss';

class TasksView {
  public static draw() {
    const main: HTMLElement | null = document.querySelector('main');

    const [container, ...rest] = [
      ['container'],
      ['lists'],
      ['tasks'],
      ['details'],
    ].map((item) => Builder.createBlock(item));

    container.append(...rest);
    if (main) main.append(container);
  }
}

export default TasksView;
