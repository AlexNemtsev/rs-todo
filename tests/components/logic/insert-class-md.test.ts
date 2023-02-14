import { describe, expect, it } from '@jest/globals';
import insertClassMd from '../../../src/components/logic/insert-class-md';

describe('When function gets a string wrapped with a tag', () => {
  it('Inserts class md in', () => {
    const actual = insertClassMd('<span>A string</span>');

    const expected = '<span class="md">A string</span>';

    expect(actual).toBe(expected);
  });
});
