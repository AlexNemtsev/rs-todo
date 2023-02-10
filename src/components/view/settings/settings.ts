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
          settingsContent.innerHTML = templateBuilder().Appearance;
          this.addSettingsListeners(0);
          break;
        case 'preference':
          settingsContent.innerHTML = templateBuilder().Preference;
          break;
        case 'hotkeys':
          settingsContent.innerHTML = templateBuilder().Hotkeys;
          break;
        default:
          settingsContent.innerHTML = templateBuilder().Appearance;
      }
    }
  }

  private static addSettingsListeners(page: number): void {
    switch (page) {
      case 1:
        // TBD
        break;
      case 2:
        // TBD
        break;
      default:
        ['.theme', '.sidebar-count', '.task-type'].forEach((setting) => {
          const blocks: NodeListOf<Element> = document.querySelectorAll(
            `${setting}`,
          );
          blocks.forEach((el) => {
            el.addEventListener('click', () => {
              blocks.forEach((block) => {
                block.classList.remove('active');
                block
                  .querySelector('.item-checked')
                  ?.classList.remove('active');
              });
              el.classList.add('active');
              el.querySelector('.item-checked')?.classList.add('active');
            });
          });
        });
    }
  }
}
export default SettingsView;
