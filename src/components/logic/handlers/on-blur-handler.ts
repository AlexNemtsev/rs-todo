import Loader from '../loader';

const onBlurHandler = () => {
  const details = document.querySelector('.details') as HTMLDivElement;
  const { children } = details;
  const strings: string[] = [];

  for (let i = 0; i < children.length; i += 1) {
    strings.push(children[i].textContent ?? '');
  }

  const taskId = Number(window.location.pathname.split('/')[3]);
  Loader.updateTask(taskId, { desc: strings.join('\n\n') }).catch((err) =>
    console.log(err),
  );
};

export default onBlurHandler;
