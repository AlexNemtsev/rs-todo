import { marked } from 'marked';
import i18next from 'i18next';
import stylesMap from './styles-map';

class MdParser {
  private static emptyP = '<p id=""></p>';

  public static parseWithClasses(md: string): string {
    return MdParser.insertAttributes(
      marked.parse(md) || MdParser.emptyP,
    ).trim();
  }

  public static insertDataMd(md: string): string {
    const tagLine = MdParser.parseWithClasses(md);
    const indOfrg = tagLine.indexOf('>');

    return `${tagLine.substring(0, indOfrg)} data-md="${md}"${tagLine.substring(
      indOfrg,
    )}`;
  }

  private static insertAttributes(tagLine: string): string {
    const indOfrt = tagLine.indexOf('>');
    const indOfSpc = tagLine.indexOf(' ');
    const tag = tagLine.substring(1, indOfSpc > indOfrt ? indOfrt : indOfSpc);
    const emptyTag = tagLine === MdParser.emptyP;
    const dataBefore = emptyTag
      ? `data-before="${i18next.t('css.emptyBefore')}"`
      : '';

    return `${tagLine.substring(0, indOfrt)} class="md md__style ${
      stylesMap[tag]
    }${emptyTag ? ' empty' : ''}"${dataBefore}${tagLine.substring(indOfrt)}`;
  }
}

export default MdParser;
