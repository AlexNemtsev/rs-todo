import extractClasses from '../extract-classes';
import parseWithClasses from '../parce-with-classes';

const onInputHandler = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const tag = parseWithClasses(input.value);
  const classes = extractClasses(tag);
  input.dataset.tag = tag;
  input.className = classes;
};

export default onInputHandler;
