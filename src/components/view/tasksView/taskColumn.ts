import i18next from 'i18next';
import Task from '../../../interfaces/task';
import Builder from '../builder/builder';
import TaskView from './task';
import Loader from '../../logic/loader';

class TaskColumn {
  tasksBlock: HTMLElement;

  taskList: HTMLElement;

  constructor(tasksBlock: HTMLElement) {
    this.tasksBlock = tasksBlock;
    this.taskList = Builder.createBlock(['tasks__list']);
  }

  public draw(): void {
    this.tasksBlock.innerHTML = '';
    const title: HTMLElement = Builder.createBlock(
      ['tasks__title'],
      'h2',
      `${i18next.t('mainScreen.lists.all')}`,
    );

    const input: HTMLInputElement = document.createElement('input');
    input.placeholder = `${i18next.t('mainScreen.lists.inputPlaceholder')}`;
    input.classList.add('tasks__input');
    this.addInputListener(input);

    this.fillTaskList();
    this.tasksBlock.append(title, input, this.taskList);
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
