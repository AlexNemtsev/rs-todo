/* eslint-disable import/no-cycle */
import i18next from 'i18next';
import templateBuilder from './templates';
import './settings.scss';
import Router from '../../logic/router';
import ICurrentSetting from '../../../interfaces/currentsetting';

class SettingsView {
  public static settings = JSON.parse(
    localStorage.getItem('settings') ||
      '{"mode":"light__mode","cTaskStyle":"def","defPrior":"0","defDate":"0","avatar":"../../../assets/img/noavatar.png","lang":"en","hotkeys":{"0":[["ctrl","s"]],"1":[["ctrl","z"]],"2":[["tab","n"],["n"]],"3":[["enter"]],"4":[["tab","m"]],"5":[["ctrl","del"]]}}',
  ) as ICurrentSetting;

  static currentkey: number;

  static keys: Set<string> = new Set();

  public static drawSettings(option: string): void {
    const main: HTMLElement | null = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      main.innerHTML = templateBuilder().main;
      SettingsView.addListeners();
      SettingsView.fillSettings(option);
    }
  }

  private static addListeners(): void {
    const settingsOptions: NodeListOf<Element> = document.querySelectorAll(
      '.option__item',
    );
    const doneButton: HTMLElement | null = document.querySelector(
      '.settings-done__button',
    );

    doneButton?.addEventListener('click', (): void => {
      Router.setRoute('/tasks');
      localStorage.setItem('settings', JSON.stringify(this.settings));
    });

    settingsOptions.forEach((el): void => {
      const anchorElement = el.querySelector('a') as HTMLAnchorElement;
      anchorElement.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const { href } = e.currentTarget as HTMLAnchorElement;
        Router.setRoute(href);
      });
    });
  }

  private static fillSettings(option: string): void {
    const settingsContent: HTMLElement | null = document.querySelector(
      '.settings-option__content',
    );
    const settingsOptions: NodeListOf<Element> = document.querySelectorAll(
      '.option__item',
    );
    settingsOptions.forEach((setting) => {
      setting.classList.remove('active');
    });
    if (settingsContent) {
      settingsContent.innerHTML = '';
      switch (option) {
        case 'appearance':
          settingsContent.innerHTML = templateBuilder().Appearance;
          settingsOptions[0].classList.add('active');
          this.addAppearanceListeners();
          break;
        case 'preference':
          settingsContent.innerHTML = templateBuilder().Preference;
          settingsOptions[1].classList.add('active');
          this.addPreferenceListeners();
          break;
        case 'hotkeys':
          settingsContent.innerHTML = templateBuilder().Hotkeys;
          settingsOptions[2].classList.add('active');
          this.addShortcutListeners();
          break;
        default:
          settingsContent.innerHTML = templateBuilder().Appearance;
          settingsOptions[0].classList.add('active');
      }
    }
  }

  private static addAppearanceListeners(): void {
    if (this.settings.mode) {
      document
        .querySelector(`.theme.${this.settings.mode}`)
        ?.classList.add('active');
      document
        .querySelector(`.theme.${this.settings.mode}`)
        ?.querySelector('.item-checked')
        ?.classList.add('active');
    }

    

    ['.theme', '.sidebar-count', '.task-type'].forEach((setting) => {
      const blocks: NodeListOf<Element> = document.querySelectorAll(
        `${setting}`,
      );
      blocks.forEach((el) => {
        el.addEventListener('click', () => {
          blocks.forEach((block) => {
            block.classList.remove('active');
            block.querySelector('.item-checked')?.classList.remove('active');
          });
          el.classList.add('active');
          el.querySelector('.item-checked')?.classList.add('active');
        });
      });
    });
    this.darkmode();
    this.cTaskMode();
    this.avatarChange();
  }

  private static addPreferenceListeners(): void {
    const langList = document.getElementById(
      'Preference-language',
    ) as HTMLSelectElement;
    const savedlang = this.settings.lang;
    if (savedlang) {
      langList.value = savedlang;
    }
    langList.addEventListener('change', () => {
      const lang = langList.value;
      i18next
        .changeLanguage(lang)
        .then(() => {
          this.settings.lang = lang;
        })
        .catch((err) => console.log(err));
    });
    this.addBasePref();
    this.addBaseDate();
  }

  private static addBasePref(): void {
    const prior = document.getElementById(
      'Preference-Default__Priority',
    ) as HTMLSelectElement;
    const savedprior = this.settings.defPrior;
    if (savedprior) {
      prior.value = savedprior;
    }
    prior.addEventListener('change', () => {
     
      this.settings.defPrior = prior.value;
       
       
    });
  }

  private static addBaseDate(): void {
    const date = document.getElementById(
      'Preference-Default__Date',
    ) as HTMLSelectElement;
    const saveddate = this.settings.defDate;
    if (saveddate) {
      date.value = saveddate.toString();
    }
    date.addEventListener('change', () => {
     
      this.settings.defDate = Number(date.value);
       
       
    });
  }

  private static addShortcutListeners() {
    const menus: NodeListOf<Element> = document.querySelectorAll(
      '.hotkey__menu',
    );
    const keyvalue = document.querySelector('.hotkey__now');
    document.querySelector('.hotkey__bind')?.addEventListener('click', () => {
      document.querySelector('.hotkey__bind')?.classList.remove('active');
      this.keys.clear();
    });
    menus.forEach((el, i) => {
      el.addEventListener('click', () => {
        menus.forEach((menu) => {
          menu.classList.remove('active');
        });
        if (!el.classList.contains('active')) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
      el.querySelector('.hotkey__add')?.addEventListener('click', (e) => {
        document.querySelector('.hotkey__bind')?.classList.add('active');
        e.stopPropagation();
        el.classList.remove('active');
        SettingsView.currentkey = i;
        if (keyvalue) keyvalue.textContent = 'Press Keys';
      });
      el.querySelector('.hotkey__clear')?.addEventListener('click', (e) => {
        const changekey = document.querySelectorAll('.hotkey')[i].firstChild;
        e.stopPropagation();
        el.classList.remove('active');
        if (changekey) changekey.textContent = 'None';
        this.settings.hotkeys[i] = [];
      });
    });
  }

  public static addKeyListener() {
    this.keys.clear();
    document.addEventListener('keydown', (e) => {
      const keyvalue = document.querySelector('.hotkey__now');
      if (window.location.pathname.split('/')[2] !== 'hotkeys') {
        return;
      }
      if (
        !document.querySelector('.hotkey__bind')?.classList.contains('active')
      ) {
        return;
      }
      if (document.querySelector('.hotkey__bind')?.classList.contains('active'))
        e.preventDefault();
      this.keys.add(e.key.toLowerCase());
      if (keyvalue) keyvalue.textContent = `${Array.from(this.keys).join('+')}`;
    });
    document.addEventListener('keyup', (e) => {
      const keyvalue = document.querySelector('.hotkey__now');
      if (window.location.pathname.split('/')[2] !== 'hotkeys') {
        return;
      }
      if (
        !document.querySelector('.hotkey__bind')?.classList.contains('active')
      ) {
        return;
      }
      if (document.querySelector('.hotkey__bind')?.classList.contains('active'))
        e.preventDefault();
      this.keys.delete(e.key.toLowerCase());
      if (this.keys.size === 0) {
        this.editHotkey(SettingsView.currentkey, keyvalue);
      }
    });
  }

  private static darkmode() {
    const modes: NodeListOf<Element> = document.querySelectorAll('.theme');
    const rootelement: Element | null = document.querySelector(':root');
    modes.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('light__mode')) {
          rootelement?.classList.remove('dark__mode');
          this.settings.mode = 'light__mode';
        } else {
          rootelement?.classList.add('dark__mode');
          this.settings.mode = 'dark__mode';
        }
      });
    });
  }

  private static cTaskMode() {
    const modes: NodeListOf<Element> = document.querySelectorAll('.task-type');

    if (this.settings.cTaskStyle) {
      document
        .querySelector(`.task-type.${this.settings.cTaskStyle}`)
        ?.classList.add('active');
      document
        .querySelector(`.task-type.${this.settings.cTaskStyle}`)
        ?.querySelector('.item-checked')
        ?.classList.add('active');
    }
     
    modes.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('def')) {
        
          this.settings.cTaskStyle = 'def';
        } else {
        
          this.settings.cTaskStyle = 'str';
        }
      });
    });
  }

  private static avatarChange() {
    const imageInput = <HTMLInputElement>document.getElementById('avatarinput');
    const imageOutput = <HTMLDivElement>document.querySelector('.avatar');
    const src = this.settings.avatar;
    if (src) imageOutput.setAttribute('src', src);
    imageInput.addEventListener('change', () => {
      const file = imageInput.files;
      const reader: FileReader = new FileReader();
      if (file) {
        reader.readAsDataURL(file[0]);
      }
      reader.addEventListener('load', () => {
        let image: string | ArrayBuffer | null = '';
        image = reader.result;
        if (typeof image === 'string') {
          imageOutput.setAttribute('src', image);
          document
            .querySelector('.avatar__picture-main')
            ?.setAttribute('src', image);
          this.settings.avatar = image;
        }
      });
    });
  }

  private static editHotkey(i: number, keyvalue: Element | null) {
    document.querySelector('.hotkey__bind')?.classList.remove('active');
    const changekey = document.querySelectorAll('.hotkey')[i].firstChild;
    if (keyvalue?.textContent && changekey) {
      this.settings.hotkeys[i] =
        this.settings.hotkeys[i].length > 1
          ? this.settings.hotkeys[i].splice(1)
          : this.settings.hotkeys[i];
      this.settings.hotkeys[i].push(keyvalue.textContent.split('+'));
      this.settings.hotkeys[i] =
        JSON.stringify(this.settings.hotkeys[i][0]) ===
        JSON.stringify(this.settings.hotkeys[i][1])
          ? this.settings.hotkeys[i].splice(1)
          : this.settings.hotkeys[i];

      changekey.textContent = `${
        this.settings.hotkeys[i].length > 1
          ? `${this.settings.hotkeys[i][0].join('+')}/${this.settings.hotkeys[
              i
            ][1].join('+')}`
          : this.settings.hotkeys[i][0].join('+')
      }`;
    }
  }
}
export default SettingsView;
