import Builder from '../builder/builder';
import Task from '../../../interfaces/task';
import Utils from '../../../utils/utils';

class TaskView {
  public static fillTask(item: Task): HTMLElement {
    const {
      id,
      task,
      dueTo,
      desc,
    }: {
      id: number;
      task: string;
      dueTo?: Date | string;
      desc?: string;
    } = item;
    const taskBlock: HTMLElement = Builder.createBlock(['task']);
    taskBlock.innerHTML = `
      <div class="task__main">
        <input class="task__input visually-hidden" type="checkbox" id="${id}">
        <label class="task__label" for="${id}">${task}</label>
        <span class="task__due-to">${Utils.convertDate(dueTo)}</span>
      </div>
    `;

    if (desc) {
      const descBlock: HTMLElement = Builder.createBlock(
        ['task__description'],
        'p',
        desc,
      );
      taskBlock.append(descBlock);
    }

    return taskBlock;
  }
}

export default TaskView;
