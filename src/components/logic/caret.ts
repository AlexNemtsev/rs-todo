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

  public static setCaretPosition(element: Element, position: number): void {
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(element.childNodes[0], position);
    range.collapse(true);

    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}

export default Caret;
