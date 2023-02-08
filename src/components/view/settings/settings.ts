/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import settingstemplates from './templates';
import './settings.scss';
import Router from '../../logic/router';

class SettingsView {
  public static drawSettings(option: string): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      main.innerHTML = settingstemplates.main;
      SettingsView.addListeners();
      SettingsView.fillSettings(option);
    }
  }

  private static addListeners(): void {
    const settingsOptions: NodeListOf<Element> = document.querySelectorAll(
      '.option__item',
    );
    const doneButton: HTMLElement | null = document.querySelector(
      '.settings-done__button',
    );

    doneButton?.addEventListener('click', (): void => {
      // TODO: сделать обработчик для списка языков и перенести в него функционал изменения языка
      const langList = document.getElementById(
        'Preference-language',
      ) as HTMLSelectElement;
      const lang = langList.value;
      i18next
        .changeLanguage(lang)
        .then(() => {
          localStorage.setItem('lang', lang);
          Router.setRoute('/tasks');
        })
        .catch((err) => console.log(err));
    });

    settingsOptions.forEach((el, index): void => {
      const anchorElement = el.querySelector('a') as HTMLAnchorElement;
      anchorElement.addEventListener('click', (e: Event) => {
        e.preventDefault();
        settingsOptions.forEach((setting) =>
          setting.classList.remove('active'),
        );
        settingsOptions[index].classList.add('active');
        const { href } = e.currentTarget as HTMLAnchorElement;

        Router.setRoute(href);
      });
    });
  }

  private static fillSettings(option: string): void {
    const settingsContent: HTMLElement | null = document.querySelector(
      '.settings-option__content',
    );
    if (settingsContent) {
      settingsContent.innerHTML = '';
      switch (option) {
        case 'appearance':
          settingsContent.innerHTML = settingstemplates.Appearance;
          break;
        case 'preference':
          settingsContent.innerHTML = settingstemplates.Preference;
          break;
        case 'hotkeys':
          settingsContent.innerHTML = settingstemplates.Hotkeys;
          break;
        default:
          settingsContent.innerHTML = settingstemplates.Appearance;
      }
    }
  }
}
export default SettingsView;
