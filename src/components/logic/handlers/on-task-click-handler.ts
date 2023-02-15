import wrapWithPre from '../wrap-with-pre';
import onDetailsClick from './on-details-click';
import insertDataMd from '../insert-data-md';
import parseWithClasses from '../parce-with-classes';

const onTaskClickHandler = (desc: string | undefined, id: number): void => {
  console.log(id);

  const details = document.querySelector('.details') as HTMLDivElement;

  details.addEventListener('click', onDetailsClick);

  const mdLines = (desc ?? '').split('\n');

  const parsedLines = mdLines.map((line) =>
    insertDataMd(parseWithClasses(line), line),
  );

  const wrappedLines = parsedLines.map((line) => wrapWithPre(line));

  details.innerHTML = wrappedLines.join('\n');
};

export default onTaskClickHandler;
