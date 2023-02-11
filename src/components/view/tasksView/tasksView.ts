import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import ListColumn from './listColumn';
import './tasksView.scss';

class TasksView {
  public static draw(): void {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';

    const [container, lists, tasks, details]: HTMLElement[] = [
      ['container'],
      ['lists'],
      ['tasks'],
      ['details'],
    ].map((item) => Builder.createBlock(item));

    ListColumn.draw(lists);
    const taskColumn = new TaskColumn(tasks);
    taskColumn.draw();

    container.append(lists, tasks, details);
    main.append(container);
  }
}

export default TasksView;
