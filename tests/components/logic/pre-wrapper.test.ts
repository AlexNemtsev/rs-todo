import { describe, expect, it } from '@jest/globals';
import wrapWithPre from '../../../src/components/logic/wrap-with-pre';

describe('When wrapper gets a string with one line', () => {
  it('Should return the string, wrapped with <pre> tag', () => {
    const str = '<p>A string to be wrapped</p>';

    const actual = wrapWithPre(str);

    const expected = `<pre>${str}</pre>`;

    expect(actual).toBe(expected);
  });
});

describe('When wrapper gets a string with multiple lines', () => {
  it('Should return a new string with all the lines wrapped with <pre> tag', () => {
    const line1 = '<p>The first line to be wrapped</p>';
    const line2 = '<p>The second line to be wrapped</p>';

    const str = `${line1}\n${line2}`;

    const actual = wrapWithPre(str);

    const expected = `<pre>${line1}</pre>\n<pre>${line2}</pre>`;

    expect(actual).toBe(expected);
  });
});

describe('When wrapper gets an empty line', () => {
  it('Should return <pre></pre>', () => {
    const actual = wrapWithPre('');

    const expected = '<pre></pre>';

    expect(actual).toBe(expected);
  });
});
