import { marked } from 'marked';
import insertClasses from './insert-classes';

const parseWithClasses = (md: string): string =>
  insertClasses(marked.parse(md) || '<p id=""></p>').trim();

export default parseWithClasses;
