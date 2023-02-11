import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import ListColumn from './listColumn';
import Task from '../../../interfaces/task';
import './tasksView.scss';

const fakeTasks: Task[] = [
  {
    id: 1,
    task: 'check json-server',
    list: 'inbox',
    createdAt: new Date(),
    removed: false,
    priority: 0,
    desc: 'check carefully',
    status: 'done',
    statusAt: new Date(), // время в unix формате, присутствует только у задач со статусом
    dueTo: new Date(), // время в unix формате, когда задача должна быть выполнена
  },
  {
    id: 2,
    task: 'check lists',
    list: 'todo',
    createdAt: new Date(),
    removed: false,
  },
];

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
    TaskColumn.draw(tasks, fakeTasks);

    container.append(lists, tasks, details);
    main.append(container);
  }
}

export default TasksView;
