import extractClasses from '../extract-classes';
import MdParser from '../md-parser';

const onInputHandler = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const tag = MdParser.parseWithClasses(input.value);
  const classes = extractClasses(tag);
  input.dataset.tag = tag;
  input.className = classes;
};

export default onInputHandler;
