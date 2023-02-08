import i18next from 'i18next';
import settingstemplates from './templates';
import './settings.scss';
import TaskView from '../tasksView/tasksView';

class SettingsView {
  public static drawSettings(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      main.innerHTML = settingstemplates.main;
      SettingsView.addListeners();
      SettingsView.fillSettings(0);
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
          TaskView.draw();
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
          settingsContent.innerHTML = settingstemplates.Appearance;
          break;
        case 1:
          settingsContent.innerHTML = settingstemplates.Preference;
          break;
        case 2:
          settingsContent.innerHTML = settingstemplates.Hotkeys;
          break;
        default:
          settingsContent.innerHTML = settingstemplates.Appearance;
      }
    }
  }
}
export default SettingsView;
