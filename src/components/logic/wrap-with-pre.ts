const wrapLine = (strToBeWrapped: string, lineNum: number): string =>
  `<pre line-number="${lineNum}">${strToBeWrapped}</pre>`;

const wrapWithPre = (strToBeWrapped: string): string => {
  const lines = strToBeWrapped.split('\n');
  const wrappedLines = lines.map((line, idx) => wrapLine(line, idx));

  return wrappedLines.join('\n');
};

export default wrapWithPre;
