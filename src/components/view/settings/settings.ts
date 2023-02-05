import settingstemplate from './templates';
import './settings.scss';
import TaskView from '../tasksView/tasksView';

class SettingsView {
  public static drawSettings(): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      main.innerHTML = settingstemplate.main;
      SettingsView.addListeners(main);
      SettingsView.fillSettings(0);
    }
  }

  public static addListeners(main: HTMLElement): void {
    const settingsOptions: NodeListOf<Element> = document.querySelectorAll(
      '.option__item',
    );
    const doneButton: HTMLElement | null = document.querySelector(
      '.settings-done__button',
    );

    doneButton?.addEventListener('click', () => {
      TaskView.draw(main);
    });

    settingsOptions.forEach((el, index) => {
      el.addEventListener('click', () => {
        settingsOptions.forEach((setting) =>
          setting.classList.remove('active'),
        );
        settingsOptions[index].classList.add('active');
        this.fillSettings(index);
      });
    });
  }

  public static fillSettings(option: number): void {
    const settingsContent: HTMLElement | null = document.querySelector(
      '.settings-option__content',
    );
    if (settingsContent) {
      settingsContent.innerHTML = '';
      switch (option) {
        case 0:
          settingsContent.innerHTML = settingstemplate.Appearance;
          break;
        case 1:
          settingsContent.innerHTML = settingstemplate.Preference;
          break;
        case 2:
          settingsContent.innerHTML = settingstemplate.Hotkeys;
          break;
        default:
          settingsContent.innerHTML = settingstemplate.Appearance;
      }
    }
  }
}
export default SettingsView;
