import onDetailsClick from '../../logic/handlers/on-details-click';
import Loader from '../../logic/loader';
import MdParser from '../../logic/md-parser';
import wrapWithPre from '../../logic/wrap-with-pre';

const showDescription = async (id: number): Promise<void> => {
  const details = document.querySelector('.details') as HTMLDivElement;

  const { desc } = await Loader.getTask(id);

  details.addEventListener('click', onDetailsClick);

  const mdLines = (desc ?? '').split('\n');

  const parsedLines = mdLines.map((line) => MdParser.insertDataMd(line));

  const wrappedLines = parsedLines.map((line) => wrapWithPre(line, id));

  details.innerHTML = wrappedLines.join('\n');
};

export default showDescription;
