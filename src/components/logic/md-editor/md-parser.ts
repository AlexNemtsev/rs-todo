import { marked } from 'marked';
import i18next from 'i18next';
import stylesMap from './styles-map';
import onBlurHandler from '../handlers/on-blur-handler';
// eslint-disable-next-line import/no-cycle
import KeyHandler from '../handlers/key-handler';
import onInputHandler from '../handlers/on-input-handler';

class MdParser {
  private static emptyP = '<p id=""></p>';

  public static parseMd(md: string): string {
    return md ? marked.parse(md).trim() : MdParser.emptyP;
  }

  public static setAttributes(details: HTMLDivElement): void {
    const { children } = details;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i] as HTMLElement;
      child.id = `string-${i}`;
      if (
        child.id === 'string-0' &&
        children.length === 1 &&
        (!child.textContent || child.textContent === '\\')
      ) {
        child.dataset.before = `${i18next.t('css.emptyBefore')}`;
        child.classList.add('empty');
        child.addEventListener('input', onInputHandler);
      }
      if (child.textContent === '\\') child.textContent = '';

      child.contentEditable = 'true';
      child.classList.add('md', 'md__style', `${stylesMap[child.tagName]}`);
      child.addEventListener('keydown', KeyHandler.onKeyDownHandler);
      child.addEventListener('blur', onBlurHandler);
    }
  }
}

export default MdParser;
