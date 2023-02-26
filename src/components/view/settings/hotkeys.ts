import Loader from '../../logic/loader';
import TaskColumn from '../tasksView/taskColumn';
import SettingsView from './settings';

class Hotkeys {
  public static addHotkeys() {
    const keys: Set<string> = new Set();
    document.addEventListener('keydown', (e) => {
      const target = <HTMLElement>e.target;
      if (
        window.location.pathname.split('/')[1] !== 'tasks' &&
        window.location.pathname.split('/')[1] !== ''
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'escape') {
        document.querySelector('.modal__wrapper')?.classList.remove('active');
        document.querySelector('.modal__window')?.classList.remove('active');
      }

      const { hotkeys } = SettingsView.settings;
      keys.add(e.key.toLowerCase());
      Object.values(hotkeys).forEach((el: Array<string[]>, i) => {
        el.forEach((arr) => {
          if (
            JSON.stringify(Array.from(keys)) === JSON.stringify(arr) &&
            !(e.target instanceof HTMLInputElement && i !== 3) &&
            !target.isContentEditable
          ) {
            e.preventDefault();
            this.applyHotkey(i);
          }
        });
      });
    });
    document.addEventListener('keyup', (e) => {
      keys.delete(e.key.toLowerCase());
      if (keys.size === 1 && Array.from(keys)[0] === 'alt') {
        keys.clear();
      }
    });
  }

  private static applyHotkey(i: number) {
    const input: HTMLElement | null = document.querySelector('.modal__input');
    switch (i) {
      case 0:
        TaskColumn.fillTaskList();
        break;
      case 1:
        if(Number(window.location.pathname.split('/')[3])){
          Loader.updateTask(Number(window.location.pathname.split('/')[3]),{ status: 'undone' }).catch((err) => console.log(err));
          TaskColumn.fillTaskList();  }
        break;
      case 2:
        document.querySelector('.modal__wrapper')?.classList.add('active');
        document.querySelector('.modal__window')?.classList.add('active');
        input?.focus();
        break;
      case 3:
        if (
          document
            .querySelector('.modal__wrapper')
            ?.classList.contains('active')
        ) {
          document
            .querySelector('.modal__input')
            ?.dispatchEvent(TaskColumn.addtask);
        } else
          document
            .querySelector('.tasks__input')
            ?.dispatchEvent(TaskColumn.addtask);
        document.querySelector('.modal__wrapper')?.classList.remove('active');
        document.querySelector('.modal__window')?.classList.remove('active');
        break;
      case 4:
        if(Number(window.location.pathname.split('/')[3])){
          Loader.updateTask(Number(window.location.pathname.split('/')[3]),{ status: 'done' }).catch((err) => console.log(err));
          TaskColumn.fillTaskList();  }
        break;
      case 5:
        if(Number(window.location.pathname.split('/')[3])){
          Loader.deleteTask(Number(window.location.pathname.split('/')[3])).catch((err) => console.log(err));
           TaskColumn.fillTaskList();}
       
        break;
      default:
        break;
    }
  }
}

export default Hotkeys;
