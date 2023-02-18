import wrapWithPre from '../wrap-with-pre';
import onDetailsClick from './on-details-click';
import MdParser from '../md-parser';

const onTaskClickHandler = (desc: string | undefined, id: number): void => {
  const details = document.querySelector('.details') as HTMLDivElement;

  details.addEventListener('click', onDetailsClick);

  const mdLines = (desc ?? '').split('\n');

  const parsedLines = mdLines.map((line) => MdParser.insertDataMd(line));

  const wrappedLines = parsedLines.map((line) => wrapWithPre(line, id));

  details.innerHTML = wrappedLines.join('\n');
};

export default onTaskClickHandler;
