import Loader from '../../logic/loader';
import TasksView from '../tasksView/tasksView';
import SettingsView from './settings';

class Hotkeys {
  public static addHotkeys() {
    const keys: Set<string> = new Set();
    window.addEventListener('keydown', (e) => {
      if (
        window.location.pathname.split('/')[1] !== 'tasks' &&
        window.location.pathname.split('/')[1] !== ''
      ) {
        return;
      }
      e.preventDefault();
      const { hotkeys } = SettingsView.settings;
      keys.add(e.key.toLocaleLowerCase());
      Object.values(hotkeys).forEach((el: Array<string[]>,i) => {
        el.forEach((arr) => {
          if (JSON.stringify(Array.from(keys)) === JSON.stringify(arr)) {
            this.applyHotkey(el,i);
          }
        });
      });
    });
    window.addEventListener('keyup', (e) => {
      keys.delete(e.key.toLocaleLowerCase());
    });
  }

  private static applyHotkey(el:Array<string[]>,i:number){
    switch(i){
      case 0:
        break
        case 1:
          break
          case 2:
            Loader.addTask({
              task:
                el.length > 1
                  ? `${el[0].join('+')}/${el[1].join('+')}`
                  : `${el[0].join('+')}`,
              list: '',
              createdAt: 1,
              removed: false,
              dueTo: 1,
            }).catch((error) => {
              console.error('Error:', error);
            });
            TasksView.draw();
          break
          case 3:
          break
          case 4:
          break
          case 5:
          break
          default:
          break
    }
  }
}

export default Hotkeys;
