const onInputHandler = (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.textContent) target.classList.remove('empty');
  else target.classList.add('empty');
};

export default onInputHandler;
