/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import templateBuilder from './templates';
import './settings.scss';
import Router from '../../logic/router';

class SettingsView {
  public static drawSettings(option: string): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      main.innerHTML = templateBuilder().main;
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
      Router.setRoute('/tasks');
    });

    settingsOptions.forEach((el): void => {
      const anchorElement = el.querySelector('a') as HTMLAnchorElement;
      anchorElement.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const { href } = e.currentTarget as HTMLAnchorElement;
        Router.setRoute(href);
      });
    });
  }

  private static fillSettings(option: string): void {
    const settingsContent: HTMLElement | null = document.querySelector(
      '.settings-option__content',
    );
    const settingsOptions: NodeListOf<Element> = document.querySelectorAll(
      '.option__item',
    );
    settingsOptions.forEach((setting) => {
      setting.classList.remove('active');
    });
    if (settingsContent) {
      settingsContent.innerHTML = '';
      switch (option) {
        case 'appearance':
          settingsContent.innerHTML = templateBuilder().Appearance;
          settingsOptions[0].classList.add('active');
          this.addAppearanceListeners();
          break;
        case 'preference':
          settingsContent.innerHTML = templateBuilder().Preference;
          settingsOptions[1].classList.add('active');
          this.addPreferenceListeners();
          break;
        case 'hotkeys':
          settingsContent.innerHTML = templateBuilder().Hotkeys;
          settingsOptions[2].classList.add('active');
          break;
        default:
          settingsContent.innerHTML = templateBuilder().Appearance;
          settingsOptions[0].classList.add('active');
      }
    }
  }

  private static addAppearanceListeners(): void {
    ['.theme', '.sidebar-count', '.task-type'].forEach((setting) => {
      const blocks: NodeListOf<Element> = document.querySelectorAll(
        `${setting}`,
      );
      blocks.forEach((el) => {
        el.addEventListener('click', () => {
          blocks.forEach((block) => {
            block.classList.remove('active');
            block.querySelector('.item-checked')?.classList.remove('active');
          });
          el.classList.add('active');
          el.querySelector('.item-checked')?.classList.add('active');
        });
      });
    });
    this.darkmode();
  }

  private static addPreferenceListeners(): void {
    const langList = document.getElementById(
      'Preference-language',
    ) as HTMLSelectElement;
    langList.addEventListener('change', () => {
      const lang = langList.value;
      i18next
        .changeLanguage(lang)
        .then(() => {
          localStorage.setItem('lang', lang);
        })
        .catch((err) => console.log(err));
    });
  }

  private static darkmode() {
    const modes: NodeListOf<Element> = document.querySelectorAll('.theme');
    const rootelement: Element | null = document.querySelector(':root');
    modes.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('light__mode')) {
          rootelement?.classList.remove('dark__mode');
          localStorage.setItem('mode', 'light__mode');
        } else {
          rootelement?.classList.add('dark__mode');
          localStorage.setItem('mode', 'dark__mode');
        }
      });
    });
  }
}
export default SettingsView;
