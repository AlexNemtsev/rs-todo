import { expect, test } from '@jest/globals';
import MdParser from '../../../src/components/logic/md-parser';

test('Should return tagline with insertd data', () => {
  const actual = MdParser.insertDataMd('## Markdown');

  const expected =
    '<h2 id="markdown" class="md md__style md__header2" data-md="## Markdown">Markdown</h2>';

  expect(actual).toBe(expected);
});
