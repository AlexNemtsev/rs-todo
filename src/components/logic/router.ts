/* eslint-disable import/no-cycle */
import SettingsView from '../view/settings/settings';
import showDescription from '../view/tasksView/show-description';
import TasksView from '../view/tasksView/tasksView';
import TimerView from '../view/timer/timerView';
import MatrixView from '../view/matrix/matrix';

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
        if (segments[3]) {
          showDescription(Number(segments[3])).catch((err) => console.log(err));
        }
        break;
      case 'timer':
        TimerView.drawTimer();
        break;
      case 'matrix':
        MatrixView.draw();
        break;
      default:
        TasksView.draw();
        break;
    }
  }
}

export default Router;
