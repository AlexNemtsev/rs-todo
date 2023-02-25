import stylesMap from './styles-map';

const createEmptyP = (): HTMLParagraphElement => {
  const p = document.createElement('p');
  p.contentEditable = 'true';
  p.classList.add('md', 'md__style', `${stylesMap[p.tagName]}`);

  return p;
};

export default createEmptyP;
