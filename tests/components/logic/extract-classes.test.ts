import { describe, expect, it } from '@jest/globals';
import extractClasses from '../../../src/components/logic/extract-classes';

describe('When extractor gets a tag', () => {
  it('Returns class string wo md', () => {
    const tag = '<h2 class="md md__style md__header2">A string</h2>';

    const actual = extractClasses(tag);

    const expected = 'md__style md__header2';

    expect(actual).toBe(expected);
  });
});
