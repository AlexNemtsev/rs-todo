import SettingsView from '../view/settings/settings';
import TasksView from '../view/tasksView/tasksView';

class App {
  public static start(): void {
    const main: HTMLElement | null = document.querySelector('main');

    if (main) TasksView.draw(main);
    const SettingsButton = document.querySelector('.nav__item');
    SettingsButton?.addEventListener('click', SettingsView.drawSettings);
  }
}

export default App;
