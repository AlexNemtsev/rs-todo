import SettingsView from '../view/settings/settings';

const ru = {
  translation: {
    mainScreen: {
      lists: {
        all: 'Все',
        today: 'Сегодня',
        tomorrow: 'Завтра',
        nextDays: 'Следующие 7 дней',
        completed: 'Выполнено',
        trash: 'Корзина',
        listsTitle: 'Списки',
        addList: 'Добавить список',
        editList: 'Редактировать список',
        addListPlaceholder: 'Название списка',
        save: 'Сохранить',
      },
      tasks: {
        inputPlaceholder: `Добавьте задачу, нажмите ${
          SettingsView.settings.hotkeys[3].length > 1
            ? `${SettingsView.settings.hotkeys[3][0].join(
                '+',
              )}/${SettingsView.settings.hotkeys[3][1].join('+')}`
            : SettingsView.settings.hotkeys[3][0].join('+')
        } для сохранения`,
        today: 'Сегодня',
        tomorrow: 'Завтра',
        week: 'Следующие 7 дней',
        custom: 'Произвольная дата',
        duplicate: 'Дублировать',
        delete: 'Удалить',
        move: 'Переместить в',
        edit: 'Редактировать',
      },
    },
    settings: {
      header: 'Настройки',
      doneBtn: 'Применить',
      settingsList: {
        appearance: 'Внешний вид',
        appearList: {
          uploadbtn: 'Загрузить Файл',
          purecolor: 'Цветовой Стиль',
          light: 'Светлый',
          dark: 'Темный',
        },
        preference: 'Основные',
        prefList: {
          language: 'Язык',
          TimeFormat: 'Формат Времени',
          DefaultDate: 'Дата по умолчанию',
          defaultPriority: 'Приоритет по умолчанию',
        },
        shortcuts: 'Горячие клавиши',
      },
    },
    css: {
      emptyBefore: 'Описание',
    },
  },
};

export default ru;
