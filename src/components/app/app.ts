import i18next from 'i18next';
import ru from '../i18n/ru';

import en from '../i18n/en';
import Router from '../logic/router';
import addHotkeys from '../view/settings/hotkeys';

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

    const mode: string | null = localStorage.getItem('mode');
    if (mode) document.querySelector(':root')?.classList.add(mode);
    else {
      document.querySelector(':root')?.classList.add('light__mode');
    }

    const avatar:string|null = localStorage.getItem('avatar');
    if(avatar)
    document.querySelector('.avatar__picture-main')?.setAttribute('src',avatar)

    addHotkeys([['tab','n'],['n']]);

    const SettingsButton = document.querySelector('.nav__item');
    SettingsButton?.addEventListener('click', () =>
      Router.setRoute('/settings/appearance'),
    );
  }
}

export default App;
