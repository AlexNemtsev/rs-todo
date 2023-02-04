class Builder {
  public static createBlock(
    classes: string[],
    tag = 'div',
    text?: string,
  ): HTMLElement {
    const block: HTMLElement = document.createElement(tag);
    block.classList.add(...classes);
    if (text) block.textContent = text;
    return block;
  }
}

export default Builder;
