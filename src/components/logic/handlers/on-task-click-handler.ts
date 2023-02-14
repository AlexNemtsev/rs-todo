import { marked } from 'marked';
import onDescInput from './on-desc-input';

const onTaskClickHandler = (desc: string | undefined): void => {
  const details = document.querySelector('.details') as HTMLDivElement;
  const container = document.querySelector<HTMLDivElement>('.container');

  const txtArea = document.createElement('textarea');
  txtArea.classList.add('detail__input');
  txtArea.value = desc ?? '';
  txtArea.addEventListener('input', (event) => onDescInput(event, details));
  container?.append(txtArea);

  details.innerHTML = marked.parse(desc ?? '');
};

export default onTaskClickHandler;
