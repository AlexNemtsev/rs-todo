import { marked } from 'marked';

const onDescInput = (event: Event, details: HTMLDivElement): void => {
  const txtArea = event.target as HTMLTextAreaElement;

  details.innerHTML = marked.parse(txtArea.value);
};

export default onDescInput;
