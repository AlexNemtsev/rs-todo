// eslint-disable-next-line import/no-cycle
import onDetailsClick from '../../logic/handlers/on-details-click';
import Loader from '../../logic/loader';
import MdParser from '../../logic/md-parser';
import wrapWithPre from '../../logic/wrap-with-pre';

const showDescription = async (id: number): Promise<void> => {
  const details = document.querySelector('.details') as HTMLDivElement;

  const { desc } = await Loader.getTask(id);

  // const parsed = MdParser.insertDataMd(desc ?? '');
  // const wrappedLines = wrapWithPre(parsed, id);

  // details.innerHTML = wrappedLines;
  // details.addEventListener('click', onDetailsClick);
  const parsed = MdParser.parseMd(desc ?? '');
  details.innerHTML = parsed;
  MdParser.setAttributes(details);
};

export default showDescription;
