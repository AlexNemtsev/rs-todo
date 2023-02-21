// eslint-disable-next-line import/no-cycle
import Router from '../router';
import onInputHandler from './on-input-handler';
import MdParser from '../md-parser';
import Loader from '../loader';
import extractMarkdown from '../extract-markdown';

const onDetailsClick = (event: Event): void => {
  const details = document.querySelector('.details') as HTMLDivElement;

  const target = (event.target as HTMLElement).closest('pre');

  const toEditElement = target?.querySelector('.md') as HTMLElement;
  const text = toEditElement?.dataset.md;

  if (toEditElement) {
    details.removeEventListener('click', onDetailsClick);
    toEditElement.textContent = text ?? '';

    toEditElement.addEventListener('input', onInputHandler);
    toEditElement.addEventListener('blur', () => {
      const taskId = Number(target?.dataset.id as string);
      const newContent = MdParser.insertDataMd(toEditElement.textContent ?? '');

      const mdText = extractMarkdown(details);

      if (target) target.innerHTML = newContent;

      Loader.updateTask(taskId, { desc: mdText })
        .then(() => Router.handleLocation())
        .catch((err) => console.log(err));
    });
  }
};

export default onDetailsClick;
