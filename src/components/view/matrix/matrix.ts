import i18next from 'i18next';
import Builder from '../builder/builder';
import Loader from '../../logic/loader';
import TaskView from '../tasksView/task';
import Priority from '../../../interfaces/priority';
import './matrix.scss';

class MatrixView {
  static quadrants: HTMLElement[];

  public static draw(): void {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';

    const container: HTMLElement = Builder.createBlock(['matrix']);
    MatrixView.quadrants = ['high', 'medium', 'low', 'none'].map(
      (value: string, i: number, arr: string[]) => {
        const quadrant: HTMLElement = Builder.createBlock([
          'quadrant',
          `quadrant--${value}`,
        ]);
        const title: HTMLElement = Builder.createBlock(
          ['quadrant__title'],
          'h2',
          `${i18next.t(`matrix.${value}`)}`,
        );
        quadrant.append(title);

        MatrixView.fillTasks(quadrant, arr.length - 1 - i);

        return quadrant;
      },
    );

    container.append(...MatrixView.quadrants);
    main.append(container);
  }

  public static fillTasks(quadrant: HTMLElement, priority: Priority): void {
    Loader.getTasksByPriority(priority)
      .then((taskData) => {
        const tasks: HTMLElement[] = taskData.map((item) =>
          TaskView.fillTask(item),
        );
        quadrant.append(...tasks);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

export default MatrixView;
