import { marked } from 'marked';
import insertClasses from './insert-classes';

const parseWithClasses = (md: string): string =>
  insertClasses(marked.parse(md)).trim();

export default parseWithClasses;
