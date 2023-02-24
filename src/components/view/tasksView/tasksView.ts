/* eslint-disable import/no-cycle */
import Builder from '../builder/builder';
import TaskColumn from './taskColumn';
import ListColumn from './listColumn';
import ContextMenu from './contextMenu';
import Utils from '../../../utils/utils';
import './tasksView.scss';

class TasksView {
  public static draw(listName?: string): void {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';

    const [container, lists, tasks, details]: HTMLElement[] = [
      ['container'],
      ['lists'],
      ['tasks'],
      ['details'],
    ].map((item) => Builder.createBlock(item));

    ListColumn.draw(lists, listName);
    TaskColumn.draw(tasks, listName);

    container.append(lists, tasks, details);
    main.append(container);

    TasksView.addListeners([TaskColumn.menu, ListColumn.menu]);
  }

  private static addListeners(contextMenus: ContextMenu[]): void {
    TasksView.addLeftClickListener(contextMenus);
    TasksView.addRightClickListener(contextMenus);
  }

  private static addLeftClickListener(contextMenus: ContextMenu[]): void {
    document.addEventListener('click', (e: MouseEvent) => {
      if (
        e.button !== 2 &&
        e.target instanceof HTMLElement &&
        !e.target.classList.contains('dates__input')
      )
        contextMenus.forEach((menu) => menu.hide());
    });
  }

  private static addRightClickListener(contextMenus: ContextMenu[]): void {
    document.addEventListener('contextmenu', (e: MouseEvent) => {
      contextMenus.forEach((menu) => menu.hide());
      if (e.target instanceof HTMLElement) {
        const task: HTMLElement | null = Utils.findByClass(e.target, 'task');
        const list: HTMLElement | null = Utils.findByClass(
          e.target,
          'list__item--custom',
        );
        if (task instanceof HTMLElement) {
          e.preventDefault();
          TaskColumn.menu.show(Number(task?.dataset.id), e);
        }
        if (list instanceof HTMLAnchorElement) {
          e.preventDefault();
          const id = Number(list.href.split('-')[1]);
          ListColumn.menu.show(id, e);
        }
      }
    });
  }
}

export default TasksView;
