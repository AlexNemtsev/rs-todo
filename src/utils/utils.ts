class Utils {
  public static convertDate(date: number | Date | undefined): string {
    let dueTo: string | Date = '';
    if (date) {
      dueTo = new Date(date);
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

  public static getDayEndInMs(days: number): number {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    const endMs = +date + ((24 * 60 * 60 * 1000) * days);

    return endMs;
  }
}

export default Utils;
