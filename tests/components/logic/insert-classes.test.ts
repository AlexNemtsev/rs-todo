import { describe, expect, it } from '@jest/globals';
import insertClasses from '../../../src/components/logic/insert-classes';

describe('When function gets a string wrapped with a tag wo attributes', () => {
  it('Inserts classes in', () => {
    const actual = insertClasses('<h2>A string</h2>');

    const expected = '<h2 class="md md__style md__header2">A string</h2>';

    expect(actual).toBe(expected);
  });
});

describe('When function gets a string wrapped with a tag with attributes', () => {
  it('Inserts classes in', () => {
    const actual = insertClasses('<h2 id="h2">A string</h2>');

    const expected =
      '<h2 id="h2" class="md md__style md__header2">A string</h2>';

    expect(actual).toBe(expected);
  });
});
