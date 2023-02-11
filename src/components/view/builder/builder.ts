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
    const input = document.createElement('input');
    input.classList.add(...classes);
    input.type = type;
    if (placeholder) input.placeholder = placeholder;
    return input;
  }
}

export default Builder;
