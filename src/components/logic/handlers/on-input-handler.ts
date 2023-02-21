import extractClasses from '../extract-classes';
import MdParser from '../md-parser';

const onInputHandler = (event: Event): void => {
  const input = event.target as HTMLElement;
  const tag = MdParser.parseWithClasses(input.textContent ?? '');
  input.dataset.md = input.textContent ?? '';
  const classes = extractClasses(tag);
  input.className = classes;
};

export default onInputHandler;
