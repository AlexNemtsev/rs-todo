const clearChildren = (element: HTMLElement): void => {
  while (element.children.length !== 0) {
    element.children[0].remove();
  }
};

export default clearChildren;
