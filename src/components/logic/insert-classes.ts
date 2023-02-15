import stylesMap from './styles-map';

const insertClasses = (tagLine: string): string => {
  const indOfrt = tagLine.indexOf('>');
  const indOfSpc = tagLine.indexOf(' ');
  const tag = tagLine.substring(1, indOfSpc > indOfrt ? indOfrt : indOfSpc);

  return `${tagLine.substring(0, indOfrt)} class="md md__style ${
    stylesMap[tag]
  }"${tagLine.substring(indOfrt)}`;
};

export default insertClasses;
