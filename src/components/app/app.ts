import i18next from 'i18next';
import ru from '../i18n/ru';

import en from '../i18n/en';
import Router from '../logic/router';
import SettingsView from '../view/settings/settings';
import Hotkeys from '../view/settings/hotkeys';
import TimerView from '../view/timer/timerView';

class App {
  public static async start(): Promise<void> {
    await i18next.init({
      lng: SettingsView.settings.lang ? SettingsView.settings.lang : 'en',
      fallbackLng: 'en',
      resources: {
        ru,
        en,
      },
    });

    window.addEventListener('popstate', () => Router.handleLocation());

    Router.handleLocation();

    const { mode } = SettingsView.settings;
    if (mode) document.querySelector(':root')?.classList.add(mode);
    else {
      document.querySelector(':root')?.classList.add('light__mode');
    }

    const { avatar } = SettingsView.settings;
    if (avatar)
      document
        .querySelector('.avatar__picture-main')
        ?.setAttribute('src', avatar);

    Hotkeys.addHotkeys();
    SettingsView.addKeyListener();
    TimerView.drawIcontimer();

    const nav: Element | null = document.querySelector('.nav');
    nav?.addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement) {
        const route = String(
          e.target.dataset.nav === 'settings'
            ? 'settings/appearance'
            : e.target.dataset.nav,
        );
        Router.setRoute(`/${route}`);
      }
    });
  }
}

export default App;
