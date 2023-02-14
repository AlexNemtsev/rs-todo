const insertDataMd = (tagLine: string, md: string): string => {
  const indOfrg = tagLine.indexOf('>');

  return `${tagLine.substring(0, indOfrg)} data-md="${md}"${tagLine.substring(
    indOfrg,
  )}`;
};

export default insertDataMd;
