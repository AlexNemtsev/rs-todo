const insertClassMd = (tagLine: string): string => {
  const indOfrg = tagLine.indexOf('>');

  return `${tagLine.substring(0, indOfrg)} class="md"${tagLine.substring(
    indOfrg,
  )}`;
};

export default insertClassMd;
