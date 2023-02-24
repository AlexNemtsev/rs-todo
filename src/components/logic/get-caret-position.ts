const getCaretPosition = (element: HTMLElement): number => {
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
};

export default getCaretPosition;
