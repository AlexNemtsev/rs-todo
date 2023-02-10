import i18next from 'i18next';
import templateBuilder from './templates';
import './settings.scss';
import TaskView from '../tasksView/tasksView';

class SettingsView {
  public static drawSettings(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      main.innerHTML = templateBuilder().main;
      SettingsView.addListeners(main);
      SettingsView.fillSettings(0);
    }
  }

  private static addListeners(main: HTMLElement): void {
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
          TaskView.draw(main);
        })
        .catch((err) => console.log(err));
    });

    settingsOptions.forEach((el, index): void => {
      el.addEventListener('click', () => {
        settingsOptions.forEach((setting) =>
          setting.classList.remove('active'),
        );
        settingsOptions[index].classList.add('active');
        this.fillSettings(index);
      });
    });
  }

  private static fillSettings(option: number): void {
    const settingsContent: HTMLElement | null = document.querySelector(
      '.settings-option__content',
    );
    if (settingsContent) {
      settingsContent.innerHTML = '';
      switch (option) {
        case 0:
          settingsContent.innerHTML = templateBuilder().Appearance;
          this.addSettingsListeners(0);
          break;
        case 1:
          settingsContent.innerHTML = templateBuilder().Preference;
          break;
        case 2:
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
