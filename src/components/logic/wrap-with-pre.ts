const wrapLine = (strToBeWrapped: string): string =>
  `<pre>${strToBeWrapped}</pre>`;

const wrapWithPre = (strToBeWrapped: string): string => {
  const lines = strToBeWrapped.split('\n');
  const wrappedLines = lines.map((line) => wrapLine(line));

  return wrappedLines.join('\n');
};

export default wrapWithPre;
