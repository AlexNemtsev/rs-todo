const wrapLine = (strToBeWrapped: string, id: number): string =>
  `<pre data-id=${id}>${strToBeWrapped}</pre>`;

const wrapWithPre = (strToBeWrapped: string, id: number): string => {
  const lines = strToBeWrapped.split('\n');
  const wrappedLines = lines.map((line) => wrapLine(line, id));

  return wrappedLines.join('\n');
};

export default wrapWithPre;
