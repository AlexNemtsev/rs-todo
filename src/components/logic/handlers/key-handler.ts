import createEmptyP from '../create-empty-p';
import Caret from '../caret';
import onBlurHandler from './on-blur-handler';

class KeyHandler {
  private static onEnter(event: Event): void {
    event.preventDefault();
    const p = createEmptyP();
    const target = event.target as HTMLElement;

    const text = target.textContent ?? '';

    const caretPos = Caret.getCaretPosition(target);
    const targetText = text.substring(0, caretPos);
    const pText = text.substring(caretPos);

    p.textContent = pText;
    target.textContent = targetText;

    target.parentNode?.insertBefore(p, target.nextSibling);
    p.focus();
    p.addEventListener('keydown', KeyHandler.onKeyDownHandler);
    p.addEventListener('blur', onBlurHandler);
  }

  private static onBackSpace(event: Event): void {
    const target = event.target as HTMLElement;
    const caretPos: number = Caret.getCaretPosition(target);
    const prevSibling: Element | null = target.previousElementSibling;

    if (!caretPos && prevSibling) {
      event.preventDefault();
      const textToMove: string = target.textContent ?? '';
      const siblingText: string = prevSibling.textContent ?? '';
      prevSibling.textContent = `${siblingText}${textToMove}`;
      Caret.setCaretPosition(prevSibling, siblingText.length);
      target.remove();
    }
  }

  private static onArrowKey(event: Event, key: 'ArrowDown' | 'ArrowUp'): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const sibling: Element | null =
      key === 'ArrowDown'
        ? target.nextElementSibling
        : target.previousElementSibling;

    if (sibling) {
      const caretPos: number = Caret.getCaretPosition(target);
      const siblingText: string = sibling.textContent ?? '';
      if (caretPos <= siblingText.length)
        Caret.setCaretPosition(sibling, caretPos);
      else Caret.setCaretPosition(sibling, siblingText.length);
    }
  }

  public static onKeyDownHandler(event: KeyboardEvent): void {
    const keyCode: string = event.code;

    switch (keyCode) {
      case 'Enter':
        KeyHandler.onEnter(event);
        break;

      case 'Backspace':
        KeyHandler.onBackSpace(event);
        break;

      case 'ArrowDown':
        KeyHandler.onArrowKey(event, keyCode);
        break;

      case 'ArrowUp':
        KeyHandler.onArrowKey(event, keyCode);
        break;

      default:
        break;
    }
  }
}

export default KeyHandler;
