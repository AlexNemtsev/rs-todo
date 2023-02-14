/* eslint-disable import/no-cycle */
import SettingsView from '../view/settings/settings';
import TasksView from '../view/tasksView/tasksView';

class Router {
  static setRoute(path: string): void {
    window.history.pushState({}, '', path);
    Router.handleLocation();
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;

    if (path === '/') {
      TasksView.draw();
    }

    const segments: string[] = path.split('/');

    switch (segments[1]) {
      case 'settings':
        SettingsView.drawSettings(segments[2]);
        break;
      case 'tasks':
        TasksView.draw();
        break;
      default:
        TasksView.draw();
        break;
    }
  }
}

export default Router;