class Caret {
  public static getCaretPosition(element: HTMLElement): number {
    let caretPos = 0;
    const sel: Selection | null = window.getSelection();
    let range: Range;

    if (sel?.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode === element) {
        caretPos = range.endOffset;
      }
    }

    return caretPos;
  }

  public static getElementAtCaret(): Node | null | undefined {
    const node = window.getSelection()?.anchorNode;
    return node?.nodeType === 3 ? node?.parentNode : node;
  }

  public static saveCaretPosition(pos?: number): void {
    const elementAtCaret = Caret.getElementAtCaret() as HTMLElement;
    const elementId: string = elementAtCaret.id;
    const caretPos =
      typeof pos === 'undefined' ? Caret.getCaretPosition(elementAtCaret) : pos;

    sessionStorage.setItem('elId', elementId);
    sessionStorage.setItem('caretPos', `${caretPos}`);
  }

  public static setCaretPosition(element: Element, position: number): void {
    const range = document.createRange();
    const sel = window.getSelection();

    try {
      range.setStart(element.childNodes[0], position);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);
    } catch {
      (element as HTMLElement).focus();
    }
  }
}

export default Caret;
