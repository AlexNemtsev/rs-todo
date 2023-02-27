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
        high: 'Высокий',
        medium: 'Средний',
        low: 'Низкий',
        none: 'Нет приоритета',
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
          SideCount:'Счетчик в списках',
          Striped:'Стиль выполненных задач',
          Striped1:'Стандарт',
          Striped2:'Перечеркнутый',
        },
        preference: 'Основные',
        prefList: {
          language: 'Язык',
          TimeFormat: 'Формат Времени',
          TimeFormat1: '12 часов',
          TimeFormat2: '24 часа',
          DefaultDate: 'Дата по умолчанию',
          DefaultDate1: 'Нет',
          DefaultDate2: 'Сегодня',
          DefaultDate3: 'Завтра',
          DefaultDate4: 'Послезавтра',
          DefaultDate5: 'Через Неделю',
          defaultPriority: 'Приоритет по умолчанию',
          defaultPriority1: 'Нет',
          defaultPriority2: 'Низкий',
          defaultPriority3: 'Средний',
          defaultPriority4: 'Высокий',
        },
        shortcuts: 'Горячие клавиши',
        shortcutsG: 'Общие',
        shortcutsA: 'Добавить Задачу',
        shortcutsE: 'Редактировать',
        shortcuts1: 'Обновить задачи',
         shortcuts2: 'Возобновить задачу',
         shortcuts3: 'Добавить новую задачу',
         shortcuts4: 'Применить',
         shortcuts5: 'Выполнить задачу',
         shortcuts6: 'Удалить задачу',
         shortcutMA:'Добавить Хоткей',
         shortcutMC:'Очистить',
      },
    },
    matrix: {
      high: 'Срочные и важные',
      medium: 'Несрочные и важные',
      low: 'Срочные и неважные',
      none: 'Несрочные и неважные',
    },
    timer:{
      average:'Минут в день в среднем:',
      start:'Старт',
      pause:'Пауза',
      reset:'Перезапуск',
      minutes:'Минут',
    },
    css: {
      emptyBefore: 'Описание',
    },
  },
};

export default ru;
