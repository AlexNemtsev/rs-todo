import { marked } from 'marked';
import insertAttributes from './insert-attributes';

const parseWithClasses = (md: string): string =>
  insertAttributes(marked.parse(md) || '<p id=""></p>').trim();

export default parseWithClasses;
