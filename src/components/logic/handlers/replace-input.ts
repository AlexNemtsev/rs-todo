/* eslint-disable import/no-cycle */
import extractMarkdown from '../extract-markdown';
import Loader from '../loader';
import MdParser from '../md-parser';
import Router from '../router';

const replaceInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const closestPre = target.closest('pre') as HTMLPreElement;
  const newElement = MdParser.insertDataMd(target.value);

  closestPre.innerHTML = newElement;

  const mdText = extractMarkdown(
    document.querySelector('.details') as HTMLDivElement,
  );

  const taskId = Number(closestPre.dataset.id as string);

  Loader.updateTask(taskId, { desc: mdText })
    .then(() => Router.handleLocation())
    .catch((err) => console.log(err));
};

export default replaceInput;
