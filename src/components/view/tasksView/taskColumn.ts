import i18next from 'i18next';
import Task from '../../../interfaces/task';
import Builder from '../builder/builder';
import TaskView from './task';
import Loader from '../../logic/loader';

class TaskColumn {
  tasksBlock: HTMLElement;

  taskList: HTMLElement;

  dateInput: HTMLInputElement;

  constructor(tasksBlock: HTMLElement) {
    this.tasksBlock = tasksBlock;
    this.taskList = Builder.createBlock(['tasks__list']);
    this.dateInput = Builder.createInput(['tasks__date-input'], 'date');
  }

  public draw(): void {
    this.tasksBlock.innerHTML = '';
    const title: HTMLElement = Builder.createBlock(
      ['tasks__title'],
      'h2',
      `${i18next.t('mainScreen.lists.all')}`,
    );

    this.fillTaskList();
    this.tasksBlock.append(title, this.createInputs(), this.taskList);
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
        console.log(taskData);

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
}

export default TaskColumn;
