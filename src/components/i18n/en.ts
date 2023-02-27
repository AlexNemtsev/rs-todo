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
          SideCount:'Sidebar Count',
          Striped:'Completed Task Style',
          Striped1:'None',
          Striped2:'Line Trough',
        },
        preference: 'Preference',
        prefList: {
          language: 'Language',
          TimeFormat: 'Time Format',
          TimeFormat1: '12 hours',
          TimeFormat2: '24 hours',
          DefaultDate: 'Default Date',
          DefaultDate1: 'None',
          DefaultDate2: 'Today',
          DefaultDate3: 'Tomorrow',
          DefaultDate4: 'Day after tomorrow',
          DefaultDate5: 'In a week',
          defaultPriority: 'Default Priority',
          defaultPriority1: 'None',
          defaultPriority2: 'Low',
          defaultPriority3: 'Medium',
          defaultPriority4: 'High',
        },
        shortcuts: 'Shortcuts',
        shortcutsG: 'General',
        shortcutsA: 'Add Task',
        shortcutsE: 'Edit Task',
        shortcuts1: 'Update Task',
        shortcuts2: 'Complete Task',
        shortcuts3: 'Add new Task',
        shortcuts4: 'Add Task below',
        shortcuts5: 'Complete Task',
        shortcuts6: 'Delete Task',
        shortcutMA:'Add Hotkey',
        shortcutMC:'Clear All',
      },
    },
    matrix: {
      high: 'Urgent & Important',
      medium: 'Not Urgent & Important',
      low: 'Urgent & Unimportant',
      none: 'Not Urgent & Unimportant',
    },
    timer:{
      average:'Average minutes per day:',
      start:'Start',
      pause:'Pause',
      reset:'Reset',
      minutes:'Minutes',
    },
    css: {
      emptyBefore: 'Description',
    },
  },
};

export default en;
