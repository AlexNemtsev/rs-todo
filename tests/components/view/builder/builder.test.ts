import { expect, test } from '@jest/globals';
import { Builder } from '../../../../src/test-collector';

test('createBlock method should return a block with specified classes', () => {
  const classes = ['class__a', 'class__b'];
  const tag = 'p';
  const textContent = 'some text';
  const block = Builder.createBlock(classes, tag, textContent);

  expect(block.tagName).toBe(tag.toUpperCase());
  expect(block.className).toBe(classes.join(' '));
  expect(block.textContent).toBe(textContent);
});

test('createInput method should return input with specified classes and type', () => {
  const classes = ['class__a', 'class__b'];
  const type = 'text';
  const placeholder = 'I hold place';
  const input = Builder.createInput(classes, type, placeholder);

  expect(input.type).toBe(type);
  expect(input.className).toBe(classes.join(' '));
  expect(input.placeholder).toBe(placeholder);
});

test('createLink method should return link with specified classes and href', () => {
  const classes = ['class__a', 'class__b'];
  const href = 'http://href.ru/';
  const link = Builder.createLink(classes, href);

  expect(link.className).toBe(classes.join(' '));
  expect(link.href).toBe(href);
});
