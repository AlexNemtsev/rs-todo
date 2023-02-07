import i18next from 'i18next';

import SettingsView from '../view/settings/settings';
import TasksView from '../view/tasksView/tasksView';

class App {
  public static async start(): Promise<void> {
    const main: HTMLElement | null = document.querySelector('main');

    if (main) TasksView.draw(main);
    const SettingsButton = document.querySelector('.nav__item');
    SettingsButton?.addEventListener('click', SettingsView.drawSettings);

    await i18next.init({
      lng: 'ru',
      resources: {
        ru: {
          translation: {
            key: 'Привет мир!',
          },
        },
      },
    });
  }
}

export default App;
