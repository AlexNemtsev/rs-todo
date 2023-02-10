import Builder from '../builder/builder';
import Task from '../../../interfaces/task';
import Utils from '../../../utils/utils';

class TaskView {
  public static fillTask(item: Task): HTMLElement {
    const { id, task, dueTo }: { id: number; task: string; dueTo?: Date | string } = item;
    const taskBlock: HTMLElement = Builder.createBlock(['task']);
    taskBlock.innerHTML = `
      <input class="task__input visually-hidden" type="checkbox" id="${id}">
      <label class="task__label" for="${id}">${task}</label>
      <span class="task__due-to">${Utils.convertDate(dueTo)}</span>
    `;

    return taskBlock;
  }
}

export default TaskView;
