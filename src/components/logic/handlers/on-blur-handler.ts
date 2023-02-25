// eslint-disable-next-line import/no-cycle
import isHeader from '../is-header';
import Loader from '../loader';

const onBlurHandler = () => {
  const details = document.querySelector('.details') as HTMLDivElement;
  const { children } = details;
  const strings: string[] = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    const childTxt: string = child.textContent || '\\';
    const hashSigns = '#'.repeat(isHeader(child));
    const strToPush: string = hashSigns ? `${hashSigns} ${childTxt}` : childTxt;
    strings.push(strToPush);
  }

  const md = strings.join('\n\n');

  const taskId = Number(window.location.pathname.split('/')[3]);
  Loader.updateTask(taskId, { desc: md }).catch((err) => console.log(err));
};

export default onBlurHandler;
