import Builder from '../builder/builder';
import Task from '../../../interfaces/task';
import TaskStatus from '../../../interfaces/status';
import Utils from '../../../utils/utils';
import onTaskClickHandler from '../../logic/handlers/on-task-click-handler';

class TaskView {
  public static fillTask(item: Task): HTMLElement {
    const {
      id,
      task,
      dueTo,
      desc,
      status,
    }: {
      id: number;
      task: string;
      dueTo?: Date | number;
      desc?: string;
      status?: TaskStatus;
    } = item;
    const taskBlock: HTMLElement = Builder.createBlock(['task']);
    taskBlock.dataset.id = id.toString();
    taskBlock.innerHTML = `
      <div class="task__main">
        <input class="task__input visually-hidden" type="checkbox" id="${id}" ${
      status === "done" ? "checked" : ""
    }>
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

    taskBlock.addEventListener('click', () => onTaskClickHandler(desc, id));

    return taskBlock;
  }
}

export default TaskView;
