import { describe, expect, it, test } from '@jest/globals';
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

describe('When parent element has children', () => {
  it("Should remove all element's children", () => {
    const div = document.createElement('div');

    for(let i = 0; i < 5; i++) {
      const el = document.createElement('div');
      div.append(el);
    }

    clearChildren(div);

    const actualNumOfChildren = div.children.length;
    const expected = 0;

    expect(actualNumOfChildren).toBe(expected);
  });
});
