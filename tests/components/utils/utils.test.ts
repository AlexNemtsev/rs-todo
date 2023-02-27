import { describe, it, expect } from '@jest/globals';
import { Utils } from '../../../src/test-collector';

const classToBeFound = 'find__me';

describe('When convert date gets date', () => {
  it('Should return string representation of date', () => {
    const date = new Date(2019, 11, 2);
    const actual = Utils.convertDate(date);

    const expected = '02.12';

    expect(actual).toBe(expected);
  });
});

describe('findByClass function', () => {
  it('should return null when passes element has no specified class', () => {
    const element = document.createElement('div');

    const actual = Utils.findByClass(element, classToBeFound);

    expect(actual).toBeNull();
  });

  it('should return passed element when it has specified class', () => {
    const element = document.createElement('div');
    element.classList.add(classToBeFound);

    const actual = Utils.findByClass(element, classToBeFound);

    expect(actual).toEqual(element);
  });

  it('should return parent element when element has no specified class', () => {
    const parent = document.createElement('div');
    const element = document.createElement('div');
    parent.classList.add(classToBeFound);
    parent.append(element);

    const actual = Utils.findByClass(element, classToBeFound);

    expect(actual).toEqual(parent);
  });
});
