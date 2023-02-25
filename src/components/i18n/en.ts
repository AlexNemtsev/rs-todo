import SettingsView from '../view/settings/settings';

const en = {
  translation: {
    mainScreen: {
      lists: {
        all: 'All',
        today: 'Today',
        tomorrow: 'Tomorrow',
        nextDays: 'Next 7 Days',
        completed: 'Completed',
        trash: 'Trash',
        listsTitle: 'Lists',
        addList: 'Add List',
        editList: 'Edit List',
        addListPlaceholder: 'List title',
        save: 'Save',
      },
      tasks: {
        inputPlaceholder: `Add task, press ${
          SettingsView.settings.hotkeys[3].length > 1
            ? `${SettingsView.settings.hotkeys[3][0].join(
                '+',
              )}/${SettingsView.settings.hotkeys[3][1].join('+')}`
            : SettingsView.settings.hotkeys[3][0].join('+')
        } to save`,
        today: 'Today',
        tomorrow: 'Tomorrow',
        week: 'Next 7 Days',
        custom: 'Custom',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        none: 'None',
        duplicate: 'Duplicate',
        delete: 'Delete',
        move: 'Move to',
        edit: 'Edit',
      },
    },
    settings: {
      header: 'Settings',
      doneBtn: 'Done',
      settingsList: {
        appearance: 'Appearance',
        appearList: {
          uploadbtn: 'Upload File',
          purecolor: 'Pure Color',
          light: 'Light',
          dark: 'Dark',
        },
        preference: 'Preference',
        prefList: {
          language: 'Language',
          TimeFormat: 'Time Format',
          DefaultDate: 'Default Date',
          defaultPriority: 'Default Priority',
        },
        shortcuts: 'Shortcuts',
      },
    },
    matrix: {
      high: 'Urgent & Important',
      medium: 'Not Urgent & Important',
      low: 'Urgent & Unimportant',
      none: 'Not Urgent & Unimportant',
    }
  },
};

export default en;
