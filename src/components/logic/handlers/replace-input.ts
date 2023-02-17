import insertDataMd from '../insert-data-md';
import parseWithClasses from '../parce-with-classes';

const replaceInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const closestPre = target.closest('pre') as HTMLPreElement;
  const newElement = insertDataMd(parseWithClasses(target.value), target.value);

  closestPre.innerHTML = newElement;
  console.log(document.querySelector('.details'));
};

export default replaceInput;
