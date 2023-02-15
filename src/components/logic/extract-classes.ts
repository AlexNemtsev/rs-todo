const extractClasses = (tag: string): string => {
  const indOfmd = tag.indexOf('md__');
  const indOfgt = tag.indexOf('>');

  return tag.substring(indOfmd, indOfgt - 1);
};

export default extractClasses;
