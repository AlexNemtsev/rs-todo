import { describe, expect, it, test } from '@jest/globals';
import jsdom from 'jsdom';
import clearChildren from '../../../src/components/view/clear-children';

describe('When parent element has no children', () => {
  it("Shouldn't affect on parent", () => {
    const div = document.createElement('div');

    clearChildren(div);

    const actualNumOfChildren = div.children.length;
    const expected = 0;

    expect(actualNumOfChildren).toBe(expected);
  });
});
