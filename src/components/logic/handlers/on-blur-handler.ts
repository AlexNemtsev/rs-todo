// eslint-disable-next-line import/no-cycle
import getHeaderLevel from '../md-editor/get-header-level';
import Loader from '../loader';

const onBlurHandler = () => {
  const details = document.querySelector(
    '.details__description',
  ) as HTMLDivElement;
  const { children } = details;

  const strings: string[] = [];

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    const childTxt: string = child.textContent || '\\';
    let strToPush = '';
    const headerLevel = getHeaderLevel(child);

    if (child.tagName === 'UL') {
      for (let j = 0; j < child.children.length; j += 1) {
        strToPush = `${strToPush} - ${child.children[j].textContent ?? ''}\n`;
      }
    } else {
      const hashSigns = '#'.repeat(headerLevel);
      strToPush = hashSigns ? `${hashSigns} ${childTxt}` : childTxt;
    }

    strings.push(strToPush);
  }

  const md = strings.join('\n\n');

  const taskId = Number(window.location.pathname.split('/')[3]);
  Loader.updateTask(taskId, { desc: md }).catch((err) => console.log(err));
};

export default onBlurHandler;
