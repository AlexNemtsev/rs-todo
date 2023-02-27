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

  public static createInput(
    classes: string[],
    type: string,
    placeholder?: string,
  ): HTMLInputElement {
    const input = Builder.createBlock(classes, 'input') as HTMLInputElement;
    input.type = type;
    if (placeholder) input.placeholder = placeholder;
    return input;
  }

  public static createLink(classes: string[], href: string): HTMLAnchorElement {
    const block = Builder.createBlock(classes, 'a') as HTMLAnchorElement;
    block.href = href;
    return block;
  }
}

export default Builder;
