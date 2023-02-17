const extractMarkdown = (div: HTMLDivElement): string => {
  const mds = div.querySelectorAll('.md');
  const strings: string[] = [];

  mds.forEach((el) => strings.push((el as HTMLElement).dataset.md ?? ''));

  return strings.join('\n');
};

export default extractMarkdown;
