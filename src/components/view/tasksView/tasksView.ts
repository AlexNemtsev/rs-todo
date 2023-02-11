import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import ListColumn from './listColumn';
import ContextMenu from './contextMenu';
import './tasksView.scss';

class TasksView {
  public static draw(main: HTMLElement): void {
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

    TasksView.addListener(taskColumn.menu);
  }

  private static addListener(contextMenu: ContextMenu): void {
    document.addEventListener('click', (e: MouseEvent) => {
      if (e.button !== 2) contextMenu.hide();
    });
  }
}

export default TasksView;
