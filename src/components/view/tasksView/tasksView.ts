import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import ListColumn from './listColumn';
import ContextMenu from './contextMenu';
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
    TaskColumn.draw(tasks);

    container.append(lists, tasks, details);
    main.append(container);

    TasksView.addListener(TaskColumn.menu);
  }

  private static addListener(contextMenu: ContextMenu): void {
    document.addEventListener('click', (e: MouseEvent) => {
      if (e.button !== 2) contextMenu.hide();
    });
  }
}

export default TasksView;
