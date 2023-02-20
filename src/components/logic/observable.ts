class Observable {
  static listeners: Set<() => void> = new Set();

  public static subscribe(listener: () => void): void {
    Observable.listeners.add(listener);
  }

  public static notify() {
    Observable.listeners.forEach((listener: () => void) => listener());
  }
}

export default Observable;
