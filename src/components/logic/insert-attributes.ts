import i18next from 'i18next';
import stylesMap from './styles-map';

const insertAttributes = (tagLine: string): string => {
  const indOfrt = tagLine.indexOf('>');
  const indOfSpc = tagLine.indexOf(' ');
  const tag = tagLine.substring(1, indOfSpc > indOfrt ? indOfrt : indOfSpc);
  const emptyTag = tagLine.includes('><');
  const dataBefore = emptyTag
    ? `data-before="${i18next.t('css.emptyBefore')}"`
    : '';

  return `${tagLine.substring(0, indOfrt)} class="md md__style ${
    stylesMap[tag]
  }${emptyTag ? ' empty' : ''}"${dataBefore}${tagLine.substring(indOfrt)}`;
};

export default insertAttributes;
