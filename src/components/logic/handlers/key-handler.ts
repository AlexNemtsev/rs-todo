import createEmptyP from '../create-empty-p';
import getCaretPosition from '../get-caret-position';
import onBlurHandler from './on-blur-handler';

class KeyHandler {
  private static onEnter(event: Event): void {
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
    p.addEventListener('keydown', KeyHandler.onKeyDownHandler);
    p.addEventListener('blur', onBlurHandler);
  }

  static onKeyDownHandler(event: KeyboardEvent): void {
    const keyCode: string = event.code;

    switch (keyCode) {
      case 'Enter':
        KeyHandler.onEnter(event);
        break;

      default:
        break;
    }
  }
}

export default KeyHandler;
