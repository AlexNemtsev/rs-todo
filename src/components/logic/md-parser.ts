import { marked } from 'marked';
import i18next from 'i18next';
import stylesMap from './styles-map';
import onBlurHandler from './handlers/on-blur-handler';
import KeyHandler from './handlers/key-handler';

class MdParser {
  private static emptyP = '<p id=""></p>';

  public static parseMd(md: string): string {
    return md ? marked.parse(md).trim() : MdParser.emptyP;
  }

  public static setAttributes(details: HTMLDivElement): void {
    const { children } = details;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i] as HTMLElement;
      if (!child.textContent) {
        child.dataset.before = `${i18next.t('css.emptyBefore')}`;
        child.classList.add('empty');
      } else if (child.textContent === '\\') child.textContent = '';

      child.contentEditable = 'true';
      child.id = `string-${i}`;
      child.classList.add('md', 'md__style', `${stylesMap[child.tagName]}`);
      child.addEventListener('keydown', KeyHandler.onKeyDownHandler);
      child.addEventListener('blur', onBlurHandler);
    }
  }

  public static parseWithClasses(md: string): string {
    return MdParser.insertAttributesIntoHTML(
      marked.parse(md).trim() || MdParser.emptyP,
    );
  }

  public static insertDataMd(md: string): string {
    const mdLines = md.split('\n');

    const tagLines = MdParser.parseWithClasses(md);

    const linesWithData = tagLines.split('\n').map((tagLine, idx) => {
      const indOfrg = tagLine.indexOf('>');

      return `${tagLine.substring(0, indOfrg)} data-md="${
        mdLines[idx]
      }"${tagLine.substring(indOfrg)}`;
    });

    return linesWithData.join('\n');
  }

  private static insertAttributesIntoHTML(html: string): string {
    const tagLines = html.split('\n');

    return tagLines.map((line) => MdParser.insertAttributes(line)).join('\n');
  }

  private static insertAttributes(tagLine: string): string {
    const indOfrt = tagLine.indexOf('>');
    const indOfSpc = tagLine.indexOf(' ');
    const tag = tagLine.substring(1, indOfSpc > indOfrt ? indOfrt : indOfSpc);
    const emptyTag = tagLine === MdParser.emptyP;
    const dataBefore = emptyTag
      ? `data-before="${i18next.t('css.emptyBefore')}"`
      : '';

    return `${tagLine.substring(
      0,
      indOfrt,
    )} contenteditable class="md md__style ${stylesMap[tag]}${
      emptyTag ? ' empty' : ''
    }"${dataBefore}${tagLine.substring(indOfrt)}`;
  }
}

export default MdParser;
