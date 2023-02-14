import replaceInput from './replace-input';

const onDetailsClick = (event: Event): void => {
  const target = (event.target as HTMLElement).closest('pre');

  const toEditElement = target?.querySelector('.md') as HTMLElement;
  const text = toEditElement.textContent;

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.classList.add('md');
  input.value = text ?? '';

  input.addEventListener('blur', replaceInput);

  target?.replaceWith(input);
};

export default onDetailsClick;
