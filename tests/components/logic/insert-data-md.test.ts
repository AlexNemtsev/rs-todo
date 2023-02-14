import { describe, expect, test } from '@jest/globals';
import insertDataMd from '../../../src/components/logic/insert-data-md';

test('Should return tagline with insertd data', () => {
  const actual = insertDataMd('<span>A string</span>', '***Markdown***');

  const expected = '<span data-md="***Markdown***">A string</span>';

  expect(actual).toBe(expected);
});
