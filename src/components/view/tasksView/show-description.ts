import Caret from '../../logic/caret';
import Loader from '../../logic/loader';
// eslint-disable-next-line import/no-cycle
import MdParser from '../../logic/md-parser';

const showDescription = async (id: number): Promise<void> => {
  const details = document.querySelector('.details') as HTMLDivElement;

  const { desc } = await Loader.getTask(id);

  const parsed = MdParser.parseMd(desc ?? '');
  details.innerHTML = parsed;
  MdParser.setAttributes(details);

  const elementAtCaretId = sessionStorage.getItem('elId');
  const caretPos = Number(sessionStorage.getItem('caretPos'));

  if (elementAtCaretId) {
    const element = document.getElementById(elementAtCaretId) as HTMLElement;
    Caret.setCaretPosition(element, caretPos);
    sessionStorage.clear();
  }
};

export default showDescription;
