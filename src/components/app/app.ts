import i18next from 'i18next';
import ru from '../i18n/ru';

import SettingsView from '../view/settings/settings';
import TasksView from '../view/tasksView/tasksView';
import en from '../i18n/en';

class App {
  public static async start(): Promise<void> {
    const main: HTMLElement | null = document.querySelector('main');

    if (main) TasksView.draw(main);
    const SettingsButton = document.querySelector('.nav__item');
    SettingsButton?.addEventListener('click', SettingsView.drawSettings);

    await i18next.init({
      lng: 'ru',
      resources: {
        ru,
        en,
      },
    });
  }
}

export default App;
