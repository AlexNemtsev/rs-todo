const settingstemplate = {
  main: `<div class="settings__container">
<div class="settings__header">
  <h1 class="settings__title">Settings</h1>
  <button class="settings-done__button">
    Done
  </button>
</div>
<div class="settings-main__container">
  <div class="settings__options">
    <ul class="options__items">
      <li class="option__item active">Appearance</li>
      <li class="option__item">Preference</li>
      <li class="option__item">Shortcuts</li>
    </ul>
  </div>
  <div class="settings-option__content"></div>
</div>
</div>`,
  Appearance: `
<h3>Pure Color</h3>
<div class="setting-appear">
<div class="theme-light"><div class="theme-light__square"><div></div></div><span>Light</span></div>
<div class="theme-dark"><div class="theme-dark__square"><div></div></div><span>Dark</span></div>
</div>
<h3>Sidebar Count</h3>
<div class="setting-appear">
<div class="sidebar-count__all"><img src="../../../assets/img/ScreenShot.png"><span>Show(All)</span></div>
<div class="sidebar-count__middle"><img src="../../../assets/img/ScreenShot2.png"><span>Show(Hide Note)</span></div>
<div class="sidebar-count__hide"><img src="../../../assets/img/ScreenShot3.png"><span>Hide(All)</span></div>
</div>
<h3>Completed Task Style</h3>
<div class="setting-appear">
<div class="task-type__def"><img src="../../../assets/img/ScreenShot4.png"><span>Default</span></div>
<div class="task-type__str"><img src="../../../assets/img/ScreenShot5.png"><span>Striketrough</span></div>
</div>`,
  Preference: `<div class="setting-pref"><label for="Preference-language">Language:</label>
<select name="Preference-language" id="Preference-language">
  <option value="English">English</option>
  <option value="Russian">Russian</option>
</select></div>
<div class="setting-pref"><label for="Preference-time__format">Time Format:</label>
<select name="Preference-time__format" id="Preference-time__format">
  <option value="12h">12 Hour</option>
  <option value="24h">24 Hour</option>
</select></div>
<div class="setting-pref"><label for="Preference-Default__Date">Default Date:</label>
<select name="Preference-Default__Date" id="Preference-Default__Date">
  <option value="none">None</option>
  <option value="Today">Today</option>
  <option value="Tomorrow">Tomorrow</option>
  <option value="Day after Tomorrow">Day after Tomorrow</option>
  <option value="Next Week">Next Week</option>
</select></div>
<div class="setting-pref"><label for="Preference-Default__Priority">Default Priority:</label>
<select name="Preference-Default__Priority" id="Preference-Default__Priority">
  <option value="none">None</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select></div>`,
  Hotkeys: `<h3>General</h3>
<div class="setting-shortcuts">
<div class="shortcut-setting"><span>Save</span> <span>Ctrl+S</span></div>
<div class="shortcut-setting"><span>Undo</span> <span>Ctrl+Z</span></div>
</div>
<h3>Add Task</h3>
<div class="setting-shortcuts">
<div class="shortcut-setting"><span>Add Task</span> <span>Tab+N/N</span></div>
<div class="shortcut-setting"><span>Add Task</span> <span>Enter</span></div>
</div>
<h3>Edit Task</h3>
<div class="setting-shortcuts">
<div class="shortcut-setting"><span>Complete Tasks</span> <span>Tab+M</span></div>
<div class="shortcut-setting"><span>Delete Tasks</span> <span>Ctrl+Del</span></div>
</div>`,
};

export default settingstemplate;
