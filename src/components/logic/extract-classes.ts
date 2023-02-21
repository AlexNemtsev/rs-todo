const extractClasses = (tag: string): string => {
  const indOfclass = tag.indexOf('class') + 7;
  const indOfgt = tag.indexOf('>');

  return tag.substring(indOfclass, indOfgt - 1);
};

export default extractClasses;
