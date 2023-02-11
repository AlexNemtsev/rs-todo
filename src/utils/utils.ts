class Utils {
  public static convertDate(date: string | Date | undefined): string {
    let dueTo: string | Date = '';
    if (date) {
      dueTo = new Date(Date.parse(String(date)));
      dueTo = `${Utils.formatDate(dueTo.getDate())}.${Utils.formatDate(
        dueTo.getMonth() + 1,
      )}`;
    }
    return dueTo;
  }

  private static formatDate(date: number): string {
    return date > 9 ? `${date}` : `0${date}`;
  }

  public static findByClass(
    elem: HTMLElement,
    classname: string,
  ): HTMLElement | null {
    if (elem.classList.contains(classname)) return elem;
    if (elem.parentElement)
      return Utils.findByClass(elem.parentElement, classname);
    return null;
  }
}

export default Utils;
