import i18next from 'i18next';
import Task from '../../../interfaces/task';
import Builder from '../builder/builder';
import TaskView from './task';
import Loader from '../../logic/loader';
import ContextMenu from './contextMenu';
import Utils from '../../../utils/utils';
import Observable from '../../logic/observable';
import templateBuilder from '../settings/templates';

class TaskColumn {
  private static tasksBlock: HTMLElement;

  private static taskList: HTMLElement = Builder.createBlock(['tasks__list']);

  public static addtask = new CustomEvent('addtask');

  private static dateInput: HTMLInputElement = Builder.createInput(
    ['tasks__date-input'],
    'date',
  );

  private static dateInputModal: HTMLInputElement = Builder.createInput(
    ['modal__date-input'],
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
    document.querySelector('body')?.append(modalWrapper);
    TaskColumn.addInputListener(input, inputModal, buttonModal, modalWrapper);
    inputWrapper.append(input, TaskColumn.dateInput, modalWindow);
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

  private static addInputListener(
    input: HTMLInputElement,
    inputModal: HTMLInputElement,
    buttonModal: HTMLInputElement,
    modalWrapper: HTMLElement,
  ): void {
    [modalWrapper, buttonModal].forEach((el, i) => {
      el.addEventListener('click', () => {
         if(i === 1)inputModal.dispatchEvent(this.addtask)
         else{inputModal.value='';
         this.dateInputModal.value='';
        }
        document.querySelector('.modal__wrapper')?.classList.remove('active');
        document.querySelector('.modal__window')?.classList.remove('active');
      });
    });
    [input, inputModal].forEach((el) => {
      el.addEventListener('addtask', () => {
        Loader.addTask({
          task: el.value,
          list: el.value,
          createdAt: Number(new Date()),
          removed: false,
          dueTo:
            TaskColumn.dateInput.value || TaskColumn.dateInputModal.value
              ? Number(new Date(TaskColumn.dateInputModal.value))
              : Number(new Date(TaskColumn.dateInput.value)) || 0,
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
