import TasksView from '../view/tasksView/tasksView';

class App {
  public static start(): void {
    const main: HTMLElement | null = document.querySelector('main');

    if (main) TasksView.draw(main);
  }
}

export default App;
