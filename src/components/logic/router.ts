/* eslint-disable import/no-cycle */
import SettingsView from '../view/settings/settings';
import TasksView from '../view/tasksView/tasksView';
import TimerView from '../view/timer/timerView';

class Router {
  static setRoute(path: string): void {
    window.history.pushState({}, '', path);
    Router.handleLocation();
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;

    const segments: string[] = path.split('/');

    switch (segments[1]) {
      case 'settings':
        SettingsView.drawSettings(segments[2]);
        break;
      case 'tasks':
        TasksView.draw(segments[2]);
        break;
      case 'timer':
        TimerView.drawTimer();
        break;
      default:
        TasksView.draw();
        break;
    }
  }
}

export default Router;
