import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import TaskView from '../tasksView/task';
import TaskStatus from '../../../interfaces/status';
import './matrix.scss';

class MatrixView {
  static quadrantTasks: HTMLElement[] = [];

  public static draw(): void {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';

    const container: HTMLElement = Builder.createBlock(['matrix']);
    const quadrants = ['high', 'medium', 'low', 'none'].map((value: string) => {
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

      MatrixView.quadrantTasks.push(taskBlock);
      quadrant.append(title, taskBlock);

      return quadrant;
    });

    container.append(...quadrants);
    main.append(container);

    MatrixView.fillTasks();
  }

  public static fillTasks(): void {
    MatrixView.quadrantTasks.forEach(
      (quadrant, i: number, arr: HTMLElement[]) => {
        quadrant.innerHTML = '';
        Loader.getTasksByPriority(arr.length - 1 - i)
          .then((taskData) => {
            const tasks: HTMLElement[] = taskData.map((item) =>
              TaskView.fillTask(item),
            );
            quadrant.append(...tasks);
            MatrixView.addCheckListener(tasks);
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
}

export default MatrixView;
