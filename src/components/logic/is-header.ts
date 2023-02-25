const isHeader = (element: Element): number => {
  const classIdx = element.className.indexOf('md__header');

  if (classIdx !== -1) return Number(element.className[classIdx + 10]);

  return 0;
};

export default isHeader;
