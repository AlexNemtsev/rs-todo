import Builder from '../builder/builder';
import Task from '../../../interfaces/task';

class TaskView {
  public static fillTask(item: Task): HTMLElement {
    const { id, task }: { id: number; task: string } = item;
    const taskBlock: HTMLElement = Builder.createBlock(['task']);
    taskBlock.innerHTML = `
      <input class="task__input visually-hidden" type="checkbox" id="${id}">
      <label class="task__label" for="${id}">${task}</label>
    `;

    return taskBlock;
  }
}

export default TaskView;
