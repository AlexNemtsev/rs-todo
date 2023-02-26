/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import Builder from '../builder/builder';
import TaskView from './task';
import Loader from '../../logic/loader';
import ContextMenu from './contextMenu';
import Utils from '../../../utils/utils';
import Observable from '../../logic/observable';
import templateBuilder from '../settings/templates';
import TaskStatus from '../../../interfaces/status';
import TaskList from '../../../interfaces/task-List';
import Task from '../../../interfaces/task';
import SettingsView from '../settings/settings';

class TaskColumn {
  private static tasksBlock: HTMLElement;

  private static taskList: HTMLElement = Builder.createBlock(['tasks__list']);

  public static addtask = new CustomEvent('addtask');

  private static dateInput: HTMLInputElement = Builder.createInput(
    ['date-input'],
    'date',
  );

  private static dateInputModal: HTMLInputElement = Builder.createInput(
    ['date-input'],
    'date',
  );

  public static menu: ContextMenu;

  private static menuBlock: HTMLElement;

  private static title: HTMLElement = Builder.createBlock(
    ['tasks__title'],
    'h2',
  );

  private static listName = 'all';

  public static draw(block: HTMLElement, listName?: string): void {
    TaskColumn.tasksBlock = block;
    TaskColumn.tasksBlock.innerHTML = '';
    if (listName) TaskColumn.listName = listName;
    TaskColumn.fillTitle(TaskColumn.listName);

    TaskColumn.menu = new ContextMenu('task');
    TaskColumn.menuBlock = this.menu.draw();

    TaskColumn.fillTaskList();
    TaskColumn.tasksBlock.append(
      TaskColumn.title,
      TaskColumn.createInputs(),
      TaskColumn.taskList,
      TaskColumn.menuBlock,
    );

    Observable.subscribe(TaskColumn.fillTaskList);
  }

  private static createInputs(): HTMLElement {
    const inputWrapper: HTMLElement = Builder.createBlock(['tasks__inputs']);
    const modalWrapper: HTMLElement = Builder.createBlock(['modal__wrapper']);
    const input: HTMLInputElement = Builder.createInput(
      ['tasks__input'],
      'text',
      `${i18next.t('mainScreen.tasks.inputPlaceholder')}`,
    );
    const inputModal: HTMLInputElement = Builder.createInput(
      ['modal__input'],
      'text',
      `${i18next.t('mainScreen.tasks.inputPlaceholder')}`,
    );
    const buttonModal: HTMLInputElement = Builder.createInput(
      ['modal__button'],
      'button',
    );
    buttonModal.value = 'Add';
    const modalWindow: HTMLElement = Builder.createBlock(['modal__window']);
    modalWindow.innerHTML = templateBuilder().Modal;
    modalWindow.prepend(inputModal);
    modalWindow
      .querySelector('.modal__icons')
      ?.prepend(TaskColumn.dateInputModal);
    modalWindow.querySelector('.modal__buttons')?.append(buttonModal);
    document.querySelector('main')?.append(modalWrapper); 
    TaskColumn.addInputListener(input, inputModal, buttonModal, modalWrapper);
    inputWrapper.append(input, TaskColumn.dateInput, modalWindow);
    return inputWrapper;
  }

  public static fillTaskList(): void {
    TaskColumn.getListTasks(TaskColumn.listName)
      .then((taskData) => {
        const tasks: HTMLElement[] = taskData.map((item) =>
          TaskView.fillTask(item),
        );
        TaskColumn.taskList.innerHTML = '';
        TaskColumn.taskList.append(...tasks);
        TaskColumn.addCheckListener(tasks);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  private static fillTitle(listName: string) {
    if (listName.includes('custom')) {
      const id = Number(listName.split('-')[1]);
      Loader.getList(id)
        .then((data: TaskList) => {
          TaskColumn.title.textContent = data.name;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      TaskColumn.title.textContent = i18next.t(`mainScreen.lists.${listName}`);
    }
  }

  private static addInputListener(
    input: HTMLInputElement,
    inputModal: HTMLInputElement,
    buttonModal: HTMLInputElement,
    modalWrapper: HTMLElement,
  ): void {
    [modalWrapper, buttonModal].forEach((el, i) => {
      el.addEventListener('click', () => {
        if (i === 1) inputModal.dispatchEvent(this.addtask);
        else {
          inputModal.value = '';
          this.dateInputModal.value = '';
        }
        document.querySelector('.modal__wrapper')?.classList.remove('active');
        document.querySelector('.modal__window')?.classList.remove('active');
      });
    });
    [input, inputModal].forEach((el) => {
      el.addEventListener('addtask', () => {
        
        if (el.value)
          Loader.addTask({
            task: el.value,
            listId: 2,
            createdAt: Number(new Date()),
            removed: false,
            priority: Number(SettingsView.settings.defPrior),
            dueTo: TaskColumn.dateInputModal.value
              ? Number(new Date(TaskColumn.dateInputModal.value))
              : Number(new Date(TaskColumn.dateInput.value)) || SettingsView.settings.defDate,
          })
            .then(() => {
              el.value = '';
              TaskColumn.dateInput.value = '';
              TaskColumn.dateInputModal.value = '';
              TaskColumn.fillTaskList();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      });
    });
  }

  private static addCheckListener(tasks: HTMLElement[]): void {
    tasks.forEach((task) => {
      task.addEventListener('change', (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
          const newStatus: TaskStatus = e.target.checked ? 'done' : 'undone';
          const taskId = Number(e.target.id);
          Loader.updateTask(taskId, { status: newStatus })
            .then(() => {
              TaskColumn.fillTaskList();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      });
    });
  }

  private static async getListTasks(listName: string): Promise<Task[]> {
    let tasks: Task[] = [];

    if (listName.includes('custom')) {
      const id = Number(listName.split('-')[1]);
      tasks = await Loader.getTasksFromList(id);
    } else {
      switch (listName) {
        case 'all':
          tasks = await Loader.getAllTasks();
          break;
        case 'today':
          tasks = await Loader.getTasksInInterval(
            ...Utils.getIntevalInMs(0, 0),
          );
          break;
        case 'tomorrow':
          tasks = await Loader.getTasksInInterval(
            ...Utils.getIntevalInMs(1, 1),
          );
          break;
        case 'nextDays':
          tasks = await Loader.getTasksInInterval(
            ...Utils.getIntevalInMs(0, 7),
          );
          break;
        case 'completed':
          tasks = await Loader.getCompletedTask();
          break;
        case 'trash':
          tasks = await Loader.getRemovedTasks();
          break;
        default:
          tasks = await Loader.getAllTasks();
          break;
      }
    }

    return tasks;
  }
}

export default TaskColumn;
