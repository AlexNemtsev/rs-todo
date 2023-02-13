import i18next from 'i18next';
import Task from '../../../interfaces/task';
import Builder from '../builder/builder';
import TaskView from './task';
import Loader from '../../logic/loader';
import ContextMenu from './contextMenu';
import Utils from '../../../utils/utils';
import Observable from '../../logic/observable';

class TaskColumn {
  private static tasksBlock: HTMLElement;

  private static taskList: HTMLElement = Builder.createBlock(['tasks__list']);

  private static dateInput: HTMLInputElement = Builder.createInput(
    ['tasks__date-input'],
    'date',
  );

  public static menu: ContextMenu;

  private static menuBlock: HTMLElement;

  public static draw(block: HTMLElement): void {
    TaskColumn.tasksBlock = block;
    TaskColumn.tasksBlock.innerHTML = '';
    const title: HTMLElement = Builder.createBlock(
      ['tasks__title'],
      'h2',
      `${i18next.t('mainScreen.lists.all')}`,
    );

    TaskColumn.menu = new ContextMenu();
    TaskColumn.menuBlock = this.menu.draw();

    TaskColumn.fillTaskList();
    TaskColumn.tasksBlock.append(
      title,
      TaskColumn.createInputs(),
      TaskColumn.taskList,
      TaskColumn.menuBlock,
    );

    TaskColumn.addTaskListListener();
    Observable.subscribe(TaskColumn.fillTaskList);
  }

  private static createInputs(): HTMLElement {
    const inputWrapper = Builder.createBlock(['tasks__inputs']);
    const input: HTMLInputElement = Builder.createInput(
      ['tasks__input'],
      'text',
      `${i18next.t('mainScreen.tasks.inputPlaceholder')}`,
    );
    TaskColumn.addInputListener(input);

    inputWrapper.append(input, TaskColumn.dateInput);
    return inputWrapper;
  }

  private static fillTaskList(): void {
    Loader.getAllTasks()
      .then((taskData: Task[]) => {
        const tasks: HTMLElement[] = taskData.map((item) =>
          TaskView.fillTask(item),
        );
        TaskColumn.taskList.innerHTML = '';
        TaskColumn.taskList.append(...tasks);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  private static addInputListener(input: HTMLInputElement): void {
    input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        Loader.addTask({
          task: input.value,
          list: input.value,
          createdAt: Number(new Date()),
          removed: false,
          dueTo: TaskColumn.dateInput.value
            ? Number(new Date(TaskColumn.dateInput.value))
            : 0,
        })
          .then(() => {
            input.value = '';
            TaskColumn.dateInput.value = '';
            TaskColumn.fillTaskList();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  }

  private static addTaskListListener(): void {
    TaskColumn.taskList.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        const task: HTMLElement | null = Utils.findByClass(e.target, 'task');
        TaskColumn.menuBlock.dataset.id = task?.dataset.id;
        TaskColumn.menuBlock.style.top = `${e.clientY}px`;
        TaskColumn.menuBlock.style.left = `${e.clientX}px`;
        TaskColumn.menu.show();
      }
    });
  }
}

export default TaskColumn;
