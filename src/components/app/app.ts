import i18next from 'i18next';
import ru from '../i18n/ru';

import SettingsView from '../view/settings/settings';
import TasksView from '../view/tasksView/tasksView';
import en from '../i18n/en';

class App {
  public static async start(): Promise<void> {
    await i18next.init({
      lng: localStorage.getItem('lang') ?? 'en',
      fallbackLng: 'en',
      resources: {
        ru,
        en,
      },
    });

    const main: HTMLElement | null = document.querySelector('main');

    if (main) TasksView.draw(main);
    const SettingsButton = document.querySelector('.nav__item');
    SettingsButton?.addEventListener('click', SettingsView.drawSettings);
  }
}

export default App;
