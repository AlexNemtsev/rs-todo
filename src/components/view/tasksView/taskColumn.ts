import i18next from 'i18next';
import Task from '../../../interfaces/task';
import Builder from '../builder/builder';
import TaskView from './task';

class TaskColumn {
  public static draw(tasksBlock: HTMLElement, taskData: Task[]): void {
    tasksBlock.innerHTML = '';
    const title: HTMLElement = Builder.createBlock(
      ['tasks__title'],
      'h2',
      `${i18next.t('mainScreen.lists.all')}`,
    );
    const tasks: HTMLElement[] = taskData.map((item) =>
      TaskView.fillTask(item),
    );

    tasksBlock.append(title, ...tasks);
  }
}

export default TaskColumn;
