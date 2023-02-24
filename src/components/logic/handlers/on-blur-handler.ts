import Loader from '../loader';

const isHeader = (element: Element): number => {
  const classIdx = element.className.indexOf('md__header');

  if (classIdx !== -1) return Number(element.className[classIdx + 10]);

  return 0;
};

const onBlurHandler = () => {
  const details = document.querySelector('.details') as HTMLDivElement;
  const { children } = details;
  const strings: string[] = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    const childTxt: string = child.textContent ?? '';
    const hashSigns = '#'.repeat(isHeader(child));
    const strToPush: string = hashSigns ? `${hashSigns} ${childTxt}` : childTxt;
    strings.push(strToPush);
  }

  const taskId = Number(window.location.pathname.split('/')[3]);
  Loader.updateTask(taskId, { desc: strings.join('\n\n') }).catch((err) =>
    console.log(err),
  );
};

export default onBlurHandler;
