import createEmptyP from '../create-empty-p';
import getCaretPosition from '../get-caret-position';
import onInputHandler from './on-input-handler';

const onEnterHandler = (event: KeyboardEvent): void => {
  if (event.code === 'Enter') {
    event.preventDefault();
    const p = createEmptyP();
    const target = event.target as HTMLElement;

    const text = target.textContent ?? '';

    const caretPos = getCaretPosition(target);
    const targetText = text.substring(0, caretPos);
    const pText = text.substring(caretPos);

    p.textContent = pText;
    target.textContent = targetText;

    target.parentNode?.insertBefore(p, target.nextSibling);
    p.focus();
    p.addEventListener('input', onInputHandler);
    p.addEventListener('keydown', onEnterHandler);
  }
};

export default onEnterHandler;
