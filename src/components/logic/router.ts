/* eslint-disable import/no-cycle */
import SettingsView from '../view/settings/settings';
import showDescription from '../view/tasksView/show-description';
import TasksView from '../view/tasksView/tasksView';

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
        if (segments[3]) showDescription(Number(segments[3]));
        break;
      default:
        TasksView.draw();
        break;
    }
  }
}

export default Router;
