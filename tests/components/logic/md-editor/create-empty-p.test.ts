import { expect, test } from '@jest/globals';
import { createEmptyP } from '../../../../src/test-collector';

test('The function should return an empty HTMLParagraphElement', () => {
  const emptyP: HTMLParagraphElement = createEmptyP();

  expect(emptyP.textContent).toBe('');
  expect(emptyP.classList.contains('md__paragraph')).toBe(true);
});
