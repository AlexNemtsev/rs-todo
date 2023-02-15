import replaceInput from './replace-input';
import parseWithClasses from '../parce-with-classes';
import onInputHandler from './on-input-handler';

const onDetailsClick = (event: Event): void => {
  const target = (event.target as HTMLElement).closest('pre');

  const toEditElement = target?.querySelector('.md') as HTMLElement;
  const text = toEditElement?.dataset.md;

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.value = text ?? '';
  input.autofocus = true;
  input.className = toEditElement?.className;
  input.classList.remove('md');
  input.dataset.tag = parseWithClasses(text ?? '');

  input.addEventListener('blur', replaceInput);
  input.addEventListener('input', onInputHandler);

  if (toEditElement) target?.replaceChildren(input);
};

export default onDetailsClick;
