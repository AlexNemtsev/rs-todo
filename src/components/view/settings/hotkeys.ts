import SettingsView from './settings';

class Hotkeys {
  public static addHotkeys() {
    const keys: Set<string> = new Set();
    document.addEventListener('keydown', (e) => {
      if (
        window.location.pathname.split('/')[1] !== 'tasks' &&
        window.location.pathname.split('/')[1] !== ''
      ) {
        return;
      }
      if (!(e.target instanceof HTMLInputElement)) e.preventDefault();
      const { hotkeys } = SettingsView.settings;
      keys.add(e.key.toLocaleLowerCase());
      Object.values(hotkeys).forEach((el: Array<string[]>, i) => {
        el.forEach((arr) => {
          if (JSON.stringify(Array.from(keys)) === JSON.stringify(arr)) {
            this.applyHotkey(el, i);
          }
        });
      });
    });
    document.addEventListener('keyup', (e) => {
      keys.delete(e.key.toLocaleLowerCase());
    });
  }

  private static applyHotkey(el: Array<string[]>, i: number) {
    switch (i) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        document.querySelector('.modal__window')?.classList.toggle('active');
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        break;
    }
  }
}

export default Hotkeys;
