import i18next from 'i18next';
import Builder from '../builder/builder';
import './matrix.scss';

class MatrixView {
  public static draw(): void {
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = '';

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
        quadrant.append(title);
        return quadrant;
      },
    );

    container.append(...quadrants);
    main.append(container);
  }
}

export default MatrixView;
