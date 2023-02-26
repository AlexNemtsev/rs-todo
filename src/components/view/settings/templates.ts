import i18next from 'i18next';
import SettingTemplate from '../../../interfaces/settings';
import ICurrentSetting from '../../../interfaces/currentsetting';
import Utils from '../../../utils/utils';

function templateBuilder(): SettingTemplate {
  const menu = `<div class="hotkey__menu-item">
  <ul>
  <li class="hotkey__add">${i18next.t(
    'settings.settingsList.shortcutMA',
  )}</li>
  <li class="hotkey__clear">${i18next.t(
    'settings.settingsList.shortcutMC',
  )}</li>
  </ul>
  </div>`;

  const settings = JSON.parse(
    localStorage.getItem('settings') ||
      '{"mode":"light__mode","avatar":"../../../assets/img/noavatar.png","lang":"en","hotkeys":{"0":[["ctrl","s"]],"1":[["ctrl","z"]],"2":[["tab","n"],["n"]],"3":[["enter"]],"4":[["tab","m"]],"5":[["ctrl","del"]]}}',
  ) as ICurrentSetting;

  return {
    main: `<div class="settings__wrapper">
    <div class="settings__container">
  <div class="settings__header">
    <h1 class="settings__title">${i18next.t('settings.header')}</h1>
    <button class="settings-done__button">
      ${i18next.t('settings.doneBtn')}
    </button>
  </div>
  <div class="settings-main__container">
    <div class="settings__options">
      <ul class="options__items">
      <li class="option__item active"><a href="/settings/appearance">${i18next.t(
        'settings.settingsList.appearance',
      )}</a></li>
      <li class="option__item"><a href="/settings/preference">${i18next.t(
        'settings.settingsList.preference',
      )}</a></li>
      <li class="option__item"><a href="/settings/hotkeys">${i18next.t(
        'settings.settingsList.shortcuts',
      )}</a></li>
      </ul>
    </div>
    <div class="settings-option__content"></div>
  </div>
  </div>
  </div>`,
    Appearance: `
    <div class="setting-appear">
  <img class="setting avatar" src="../../../assets/img/noavatar.png">
  <label for="avatarinput" class="uploadButton">${i18next.t(
    'settings.settingsList.appearList.uploadbtn',
  )}</label>
  <input type="file" name="avatarinput" id="avatarinput" accept="image/png, image/jpg">
  </div>
  <h3>${i18next.t('settings.settingsList.appearList.purecolor')}</h3>
  <div class="setting-appear">
  <div class="theme light__mode"><div class="item-checked"><img src="../../../assets/img/checkmark.svg"></div><div class="theme-light__square"><div></div></div><span>${i18next.t(
    'settings.settingsList.appearList.light',
  )}</span></div>
  <div class="theme dark__mode"><div class="item-checked"><img src="../../../assets/img/checkmark.svg"></div><div class="theme-dark__square"><div></div></div><span>${i18next.t(
    'settings.settingsList.appearList.dark',
  )}</span></div>
  </div>
  <h3>${i18next.t('settings.settingsList.appearList.SideCount')}</h3>
  <div class="setting-appear">
  <div class="sidebar-count all active"><div class="item-checked active"><img src="../../../assets/img/checkmark.svg"></div><img src="../../../assets/img/ScreenShot.png"><span>Show(All)</span></div>
  <div class="sidebar-count middle"><div class="item-checked"><img src="../../../assets/img/checkmark.svg"></div><img src="../../../assets/img/ScreenShot2.png"><span>Show(Hide Note)</span></div>
  <div class="sidebar-count hide"><div class="item-checked"><img src="../../../assets/img/checkmark.svg"></div><img src="../../../assets/img/ScreenShot3.png"><span>Hide(All)</span></div>
  </div>
  <h3>${i18next.t('settings.settingsList.appearList.Striped')}</h3>
  <div class="setting-appear">
  <div class="task-type def "><div class="item-checked "><img src="../../../assets/img/checkmark.svg"></div><img src="../../../assets/img/ScreenShot4.png"><span>${i18next.t('settings.settingsList.appearList.Striped1')}</span></div>
  <div class="task-type str"><div class="item-checked"><img src="../../../assets/img/checkmark.svg"></div><img src="../../../assets/img/ScreenShot5.png"><span>${i18next.t('settings.settingsList.appearList.Striped2')}</span></div>
  </div>`,
    Preference: `<div class="setting-pref"><label for="Preference-language">${i18next.t(
      'settings.settingsList.prefList.language',
    )}:</label>
  <select name="Preference-language" id="Preference-language">
    <option value="en">English</option>
    <option value="ru">Русский</option>
  </select></div>
  <div class="setting-pref"><label for="Preference-time__format">${i18next.t(
    'settings.settingsList.prefList.TimeFormat',
  )}:</label>
  <select name="Preference-time__format" id="Preference-time__format">
    <option value="12h">${i18next.t(
      'settings.settingsList.prefList.TimeFormat1',
    )}</option>
    <option value="24h">${i18next.t(
      'settings.settingsList.prefList.TimeFormat2',
    )}</option>
  </select></div>
  <div class="setting-pref"><label for="Preference-Default__Date">${i18next.t(
    'settings.settingsList.prefList.DefaultDate',
  )}:</label>
  <select name="Preference-Default__Date" id="Preference-Default__Date">
    <option value="0">${i18next.t('settings.settingsList.prefList.DefaultDate1',)}</option>
    <option value="${Utils.getDayEndInMs(0)}">${i18next.t('settings.settingsList.prefList.DefaultDate2',)}</option>
    <option value="${Utils.getDayEndInMs(1)}">${i18next.t('settings.settingsList.prefList.DefaultDate3',)}</option>
    <option value="${Utils.getDayEndInMs(2)}">${i18next.t('settings.settingsList.prefList.DefaultDate4',)}</option>
    <option value="${Utils.getDayEndInMs(7)}">${i18next.t('settings.settingsList.prefList.DefaultDate5',)}</option>
  </select></div>
  <div class="setting-pref"><label for="Preference-Default__Priority">${i18next.t(
    'settings.settingsList.prefList.defaultPriority',
  )}:</label>
  <select name="Preference-Default__Priority" id="Preference-Default__Priority">
    <option value="0">${i18next.t('settings.settingsList.prefList.defaultPriority1',)}</option>
    <option value="1">${i18next.t('settings.settingsList.prefList.defaultPriority2',)}</option>
    <option value="2">${i18next.t('settings.settingsList.prefList.defaultPriority3',)}</option>
    <option value="3">${i18next.t('settings.settingsList.prefList.defaultPriority4',)}</option>
  </select></div>`,
    Hotkeys: `
    <div class="hotkey__bind">
    <div class="hotkey__now">Current hotkey</div>
    </div>
    <h3>${i18next.t('settings.settingsList.shortcutsG',)}</h3>
  <div class="setting-shortcuts">
  <div class="shortcut-setting"><span>${i18next.t('settings.settingsList.shortcuts1',)}</span> <div class="hotkey"><span class="hotkey__key">${
    settings.hotkeys[0].length > 1
      ? `${settings.hotkeys[0][0].join('+')}/${settings.hotkeys[0][1].join(
          '+',
        )}`
      : settings.hotkeys[0][0].join('+')
  }</span> <div class="hotkey__menu"><span>...</span>   ${menu}</div></div></div>
  <div class="shortcut-setting"><span>${i18next.t('settings.settingsList.shortcuts2',)}</span> <div class="hotkey"><span class="hotkey__key">${
    settings.hotkeys[1].length > 1
      ? `${settings.hotkeys[1][0].join('+')}/${settings.hotkeys[1][1].join(
          '+',
        )}`
      : settings.hotkeys[1][0].join('+')
  }</span> <div class="hotkey__menu"><span>...</span>   ${menu}</div></div></div>
  </div>
  <h3>${i18next.t('settings.settingsList.shortcutsA',)}</h3>
  <div class="setting-shortcuts">
  <div class="shortcut-setting"><span>${i18next.t('settings.settingsList.shortcuts3',)}</span> <div class="hotkey"><span class="hotkey__key">${
    settings.hotkeys[2].length > 1
      ? `${settings.hotkeys[2][0].join('+')}/${settings.hotkeys[2][1].join(
          '+',
        )}`
      : settings.hotkeys[2][0].join('+')
  }</span> <div class="hotkey__menu"><span>...</span>${menu}
  </div></div></div>
  <div class="shortcut-setting"><span>${i18next.t('settings.settingsList.shortcuts4',)}</span> <div class="hotkey"><span class="hotkey__key">${
    settings.hotkeys[3].length > 1
      ? `${settings.hotkeys[3][0].join('+')}/${settings.hotkeys[3][1].join(
          '+',
        )}`
      : settings.hotkeys[3][0].join('+')
  }</span> <div class="hotkey__menu"><span>...</span>   ${menu}</div></div></div>
  </div>
  <h3>${i18next.t('settings.settingsList.shortcutsE',)}</h3>
  <div class="setting-shortcuts">
  <div class="shortcut-setting"><span>${i18next.t('settings.settingsList.shortcuts5',)}</span> <div class="hotkey"><span class="hotkey__key">${
    settings.hotkeys[4].length > 1
      ? `${settings.hotkeys[4][0].join('+')}/${settings.hotkeys[4][1].join(
          '+',
        )}`
      : settings.hotkeys[4][0].join('+')
  }</span> <div class="hotkey__menu"><span>...</span>   ${menu}</div></div></div>
  <div class="shortcut-setting"><span>${i18next.t('settings.settingsList.shortcuts6',)}</span> <div class="hotkey"><span class="hotkey__key">${
    settings.hotkeys[5].length > 1
      ? `${settings.hotkeys[5][0].join('+')}/${settings.hotkeys[5][1].join(
          '+',
        )}`
      : settings.hotkeys[5][0].join('+')
  }</span> <div class="hotkey__menu"><span>...</span>   ${menu}</div></div></div>
  </div>`,
    Modal: `
  <div class="modal__buttons">
  <div class="modal__icons"></div>`,
  };
}

export default templateBuilder;
