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
}

export default Utils;
