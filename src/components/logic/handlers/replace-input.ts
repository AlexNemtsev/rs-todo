import { marked } from 'marked';
import insertClasses from '../insert-classes';
import insertDataMd from '../insert-data-md';

const replaceInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const closestPre = target.closest('pre') as HTMLPreElement;
  const newElement = insertDataMd(
    insertClasses(marked.parse(target.value)).trim(),
    target.value,
  );

  closestPre.innerHTML = newElement;
};

export default replaceInput;
