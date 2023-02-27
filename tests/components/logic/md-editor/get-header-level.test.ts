import { describe, expect, it } from '@jest/globals';
import { getHeaderLevel } from '../../../../src/test-collector';

describe('When function gets a header element', () => {
  it('Should return header level', () => {
    const header = document.createElement('h4');
    header.classList.add('md__header4');
    const expected = 4;

    const headerLevel = getHeaderLevel(header);

    expect(headerLevel).toBe(expected);
  });
});

describe('When function gets a non-header element', () => {
  it('Should return 0', () => {
    const header = document.createElement('p');
    const expected = 0;

    const headerLevel = getHeaderLevel(header);

    expect(headerLevel).toBe(expected);
  });
});
