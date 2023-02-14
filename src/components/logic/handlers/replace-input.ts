const replaceInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const pre = document.createElement('pre');
  const newText = document.createElement('h1');
  newText.textContent = target.value;
  newText.classList.add('md');
  pre.append(newText);

  target.replaceWith(pre);
};

export default replaceInput;
