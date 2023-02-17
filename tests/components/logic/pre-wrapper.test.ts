import { describe, expect, it } from '@jest/globals';
import wrapWithPre from '../../../src/components/logic/wrap-with-pre';

describe('When wrapper gets a string with one line', () => {
  it('Should return the string, wrapped with <pre> tag', () => {
    const str = '<p>A string to be wrapped</p>';

    const actual = wrapWithPre(str, 1);

    const expected = `<pre data-id=1>${str}</pre>`;

    expect(actual).toBe(expected);
  });
});

describe('When wrapper gets a string with multiple lines', () => {
  it('Should return a new string with all the lines wrapped with <pre> tag', () => {
    const line1 = '<p>The first line to be wrapped</p>';
    const line2 = '<p>The second line to be wrapped</p>';

    const str = `${line1}\n${line2}`;

    const actual = wrapWithPre(str, 1);

    const expected = `<pre data-id=1>${line1}</pre>\n<pre data-id=1>${line2}</pre>`;

    expect(actual).toBe(expected);
  });
});

describe('When wrapper gets an empty line', () => {
  it('Should return <pre></pre>', () => {
    const actual = wrapWithPre('', 1);

    const expected = '<pre data-id=1></pre>';

    expect(actual).toBe(expected);
  });
});
