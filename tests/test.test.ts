import { expect, it } from '@jest/globals';

it('should be passed successfully', () => {
  const result = 1 + 2;
  const expected = 3;
  expect(result).toBe(expected);
});
