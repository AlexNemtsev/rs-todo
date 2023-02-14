import { marked } from 'marked';
import wrapWithPre from '../wrap-with-pre';
import onDetailsClick from './on-details-click';
import insertClassMd from '../insert-class-md';

const onTaskClickHandler = (desc: string | undefined): void => {
  const details = document.querySelector('.details') as HTMLDivElement;

  details.addEventListener('click', onDetailsClick);

  const mdLines = (desc ?? '').split('\n');

  const parsedLines = mdLines.map((line) =>
    insertClassMd(marked.parse(line)).trim(),
  );

  const wrappedLines = parsedLines.map((line) => wrapWithPre(line));

  details.innerHTML = wrappedLines.join('\n');
};

export default onTaskClickHandler;
