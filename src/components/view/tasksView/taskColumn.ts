import i18next from 'i18next';
import Task from '../../../interfaces/task';
import Builder from '../builder/builder';
import TaskView from './task';
import Loader from '../../logic/loader';
import ContextMenu from './contextMenu';
import Utils from '../../../utils/utils';

class TaskColumn {
  tasksBlock: HTMLElement;

  taskList: HTMLElement;

  dateInput: HTMLInputElement;

  menu: ContextMenu;

  menuBlock: HTMLElement;

  constructor(tasksBlock: HTMLElement) {
    this.tasksBlock = tasksBlock;
    this.taskList = Builder.createBlock(['tasks__list']);
    this.dateInput = Builder.createInput(['tasks__date-input'], 'date');
    this.menu = new ContextMenu();
    this.menuBlock = this.menu.draw();
  }

  public draw(): void {
    this.tasksBlock.innerHTML = '';
    const title: HTMLElement = Builder.createBlock(
      ['tasks__title'],
      'h2',
      `${i18next.t('mainScreen.lists.all')}`,
    );

    this.fillTaskList();
    this.tasksBlock.append(
      title,
      this.createInputs(),
      this.taskList,
      this.menuBlock,
    );
    this.addTaskListListener();
  }

  private createInputs(): HTMLElement {
    const inputWrapper = Builder.createBlock(['tasks__inputs']);
    const input: HTMLInputElement = Builder.createInput(
      ['tasks__input'],
      'text',
      `${i18next.t('mainScreen.lists.inputPlaceholder')}`,
    );
    this.addInputListener(input);

    inputWrapper.append(input, this.dateInput);
    return inputWrapper;
  }

  private fillTaskList(): void {
    Loader.getAllTasks()
      .then((taskData: Task[]) => {
        const tasks: HTMLElement[] = taskData.map((item) =>
          TaskView.fillTask(item),
        );
        this.taskList.innerHTML = '';
        this.taskList.append(...tasks);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  private addInputListener(input: HTMLInputElement): void {
    input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        Loader.addTask({
          task: input.value,
          list: input.value,
          createdAt: new Date(),
          removed: false,
          dueTo: this.dateInput.value ? new Date(this.dateInput.value) : '',
        }).catch((error) => {
          console.error('Error:', error);
        });

        input.value = '';
        this.fillTaskList();
      }
    });
  }

  private addTaskListListener(): void {
    this.taskList.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        const task: HTMLElement | null = Utils.findByClass(e.target, 'task');
        this.menuBlock.dataset.id = task?.dataset.id;
        this.menuBlock.style.top = `${e.clientY}px`;
        this.menuBlock.style.left = `${e.clientX}px`;
        this.menu.show();
      }
    });
  }
}

export default TaskColumn;
