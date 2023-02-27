import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import TaskView from '../tasksView/task';
import TaskStatus from '../../../interfaces/status';
import Priority from '../../../interfaces/priority';
import './matrix.scss';

class MatrixView {
  static quadrantTasks: HTMLElement[] = [];

  static draggableItem: HTMLElement;

  public static draw(): void {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';
    MatrixView.quadrantTasks = [];

    const container: HTMLElement = Builder.createBlock(['matrix']);
    const quadrants: HTMLElement[] = ['high', 'medium', 'low', 'none'].map(
      (value: string) => {
        const quadrant: HTMLElement = Builder.createBlock([
          'quadrant',
          `quadrant--${value}`,
        ]);
        const title: HTMLElement = Builder.createBlock(
          ['quadrant__title'],
          'h2',
          `${i18next.t(`matrix.${value}`)}`,
        );
        const taskBlock: HTMLElement = Builder.createBlock(['quadrant__tasks']);
        taskBlock.dataset.priority = value;

        MatrixView.quadrantTasks.push(taskBlock);
        quadrant.append(title, taskBlock);

        return quadrant;
      },
    );

    container.append(...quadrants);
    main.append(container);

    MatrixView.fillTasks();
    MatrixView.addHoverDragHandler();
    MatrixView.addDropHandler();
  }

  public static fillTasks(): void {
    MatrixView.quadrantTasks.forEach(
      (quadrant, i: number, arr: HTMLElement[]) => {
        Loader.getTasksByPriority(arr.length - 1 - i)
          .then((taskData) => {
            const tasks: HTMLElement[] = taskData.map((item) =>
              TaskView.fillTask(item, true),
            );
            quadrant.innerHTML = '';
            quadrant.append(...tasks);
            MatrixView.addCheckListener(tasks);
            MatrixView.addDragStartHandler(tasks);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
    );
  }

  private static addCheckListener(tasks: HTMLElement[]): void {
    tasks.forEach((task) => {
      task.addEventListener('change', (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
          const newStatus: TaskStatus = e.target.checked ? 'done' : 'undone';
          const taskId = Number(e.target.id);
          Loader.updateTask(taskId, { status: newStatus })
            .then(() => {
              MatrixView.fillTasks();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      });
    });
  }

  private static addDragStartHandler(tasks: HTMLElement[]): void {
    tasks.forEach((task) => {
      task.addEventListener('dragstart', (e: Event) => {
        if (e.target instanceof HTMLElement)
          MatrixView.draggableItem = e.target;
      });
    });
  }

  private static addHoverDragHandler(): void {
    MatrixView.quadrantTasks.forEach((quadrant: HTMLElement) => {
      quadrant.addEventListener('dragenter', function () {
        this.classList.add('quadrant__tasks--hover');
      });

      quadrant.addEventListener('dragleave', function () {
        this.classList.remove('quadrant__tasks--hover');
      });
    });
  }

  private static addDropHandler(): void {
    MatrixView.quadrantTasks.forEach((quadrant: HTMLElement) => {
      quadrant.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      quadrant.addEventListener('drop', function () {
        const taskId = Number(MatrixView.draggableItem.dataset.id);
        const taskPriority = this.dataset.priority as keyof typeof Priority;

        Loader.updateTask(taskId, { priority: Priority[taskPriority] })
          .then(() => {
            MatrixView.fillTasks();
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        this.append(MatrixView.draggableItem);
        this.classList.remove('quadrant__tasks--hover');
      });
    });
  }
}

export default MatrixView;
