const onTaskClickHandler = (desc: string | undefined): void => {
  const details = document.querySelector<HTMLDivElement>('.details');

  if (details) details.innerHTML = desc ?? '';
};

export default onTaskClickHandler;
