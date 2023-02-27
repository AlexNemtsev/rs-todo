import stylesMap from './styles-map';
import Builder from '../../view/builder/builder';

const createEmptyP = (): HTMLParagraphElement => {
  const p = Builder.createBlock(['md', 'md__style', `${stylesMap.P}`], 'p');
  p.contentEditable = 'true';

  return p as HTMLParagraphElement;
};

export default createEmptyP;
