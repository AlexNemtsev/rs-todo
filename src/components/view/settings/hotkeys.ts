import Loader from '../../logic/loader';
import TasksView from '../tasksView/tasksView';

function addHotkeys(testhotkey: Array<string[]>) {
  const keys: Set<string> = new Set();
  window.addEventListener('keydown', (e) => {
    if(window.location.pathname.split('/')[1]!=='tasks' && window.location.pathname.split('/')[1]!==''){
      return;
    }
    keys.add(e.key.toLocaleLowerCase());
    testhotkey.forEach((el) => {
      if (JSON.stringify(Array.from(keys)) === JSON.stringify(el)) {
        Loader.addTask({
          task: el.length>1?`${el[0]}+${el[1]}`:`${el[0]}`,
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
  window.addEventListener('keyup', (e) => {
    keys.delete(e.key.toLocaleLowerCase());
  });
}
export default addHotkeys;
