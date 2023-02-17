import { describe, expect, it } from '@jest/globals';
import extractMarkdown from '../../../src/components/logic/extract-markdown';

describe('When extractor gets details element', () => {
  it('Should return a md string ready to be written', () => {
    const div = document.createElement('div');

    const firstLine = document.createElement('pre');
    const header1 = document.createElement('h1');
    header1.dataset.md = '# The first line to be extracted';
    firstLine.append(header1);
    const secondLine = document.createElement('pre');
    const header2 = document.createElement('h1');
    header2.dataset.md = '## The second line to be extracted';
    secondLine.append(header1);

    const actual = extractMarkdown(div);

    const expected =
      '# The first line to be extracted\n## The second line to be extracted';

    expect(actual).toBe(expected);
  });
});
