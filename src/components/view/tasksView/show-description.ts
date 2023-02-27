import Caret from '../../logic/md-editor/caret';
import Loader from '../../logic/loader';
import Builder from '../builder/builder';
// eslint-disable-next-line import/no-cycle
import MdParser from '../../logic/md-editor/md-parser';
import Observable from '../../logic/observable';
import Router from '../../logic/router';

const addEditTitleListener = (
  input: HTMLInputElement,
  taskTitle: string,
  id: number,
): void => {
  input.addEventListener('blur', () => {
    if (input.value !== taskTitle) {
      Loader.updateTask(id, { task: input.value })
        .then(() => {
          Observable.notify();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  });
};

const showDescription = async (id: number): Promise<void> => {
  const details = document.querySelector('.details') as HTMLDivElement;

  let task = '';
  let desc: string | undefined = '';

  try {
    const loadedTask = await Loader.getTask(id);
    task = loadedTask.task;
    desc = loadedTask.desc;
  } catch {
    Router.setRoute('/tasks/all');
  }

  const editTitle: HTMLInputElement = Builder.createInput(
    ['details__title'],
    'text',
  );
  editTitle.value = task;
  const editDesc: HTMLElement = Builder.createBlock(['details__description']);
  details.append(editTitle, editDesc);
  addEditTitleListener(editTitle, task, id);

  const parsed = MdParser.parseMd(desc ?? '');
  editDesc.innerHTML = parsed;
  MdParser.setAttributes(editDesc);

  const elementAtCaretId = sessionStorage.getItem('elId');
  const caretPos = Number(sessionStorage.getItem('caretPos'));

  if (elementAtCaretId) {
    const element = document.getElementById(elementAtCaretId) as HTMLElement;
    Caret.setCaretPosition(element, caretPos);
    sessionStorage.clear();
  }
};

export default showDescription;
