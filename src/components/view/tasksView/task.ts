import Builder from '../builder/builder';
import Task from '../../../interfaces/task';
import TaskStatus from '../../../interfaces/status';
import Utils from '../../../utils/utils';
import Priority from '../../../interfaces/priority';

class TaskView {
  public static fillTask(item: Task, isDraggable = false): HTMLElement {
    const {
      id,
      task,
      dueTo,
      desc,
      status,
      priority,
    }: {
      id: number;
      task: string;
      dueTo?: Date | number;
      desc?: string;
      status?: TaskStatus;
      priority?: Priority
    } = item;
    const taskBlock: HTMLElement = Builder.createBlock(['task']);
    taskBlock.dataset.id = id.toString();
    if (isDraggable) taskBlock.draggable = true;
    taskBlock.innerHTML = `
      <div class="task__main">
        <input class="task__input visually-hidden" type="checkbox" id="${id}" ${
      status === "done" ? "checked" : ""
    }>
        <label class="task__label task__label--${priority === undefined ? '0' : priority}" for="${id}">${task}</label>
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
