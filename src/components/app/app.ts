import i18next from 'i18next';
import ru from '../i18n/ru';

import en from '../i18n/en';
import Router from '../logic/router';

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

    window.addEventListener('popstate', () => Router.handleLocation());

    Router.handleLocation();
    const SettingsButton = document.querySelector('.nav__item');
    SettingsButton?.addEventListener('click', () =>
      Router.setRoute('/settings'),
    );
  }
}

export default App;
