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
      const { hotkeys } = SettingsView.settings;
      keys.add(e.key.toLocaleLowerCase());
      Object.values(hotkeys).forEach((el: Array<string[]>) => {
        el.forEach((arr) => {
          if (JSON.stringify(Array.from(keys)) === JSON.stringify(arr)) {
            Loader.addTask({
              task:
                el.length > 1
                  ? `${el[0].join('+')}/${el[1].join('+')}`
                  : `${el[0].join('+')}`,
              list: '',
              createdAt: new Date(),
              removed: false,
              dueTo: 'today',
            }).catch((error) => {
              console.error('Error:', error);
            });
            TasksView.draw();
          }
        });
      });
    });
    window.addEventListener('keyup', (e) => {
      keys.delete(e.key.toLocaleLowerCase());
    });
  }
}

export default Hotkeys;
