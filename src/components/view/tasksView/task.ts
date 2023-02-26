/* eslint-disable import/no-cycle */
import Builder from '../builder/builder';
import Task from '../../../interfaces/task';
import TaskStatus from '../../../interfaces/status';
import Utils from '../../../utils/utils';
import Priority from '../../../interfaces/priority';
import onTaskClickHandler from '../../logic/handlers/on-task-click-handler';
import SettingsView from '../settings/settings';

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
    const list: string = window.location.pathname.split('/')[2];
    if(SettingsView.settings.cTaskStyle==='str')
    taskBlock.classList.add('str')
    taskBlock.dataset.id = id.toString();
    if (isDraggable) taskBlock.draggable = true;
    taskBlock.dataset.href = `tasks/${list ?? 'all'}/${id}`;
    taskBlock.innerHTML = `
      <div class="task__main">
        <input class="task__input visually-hidden" type="checkbox" id="${id}" ${
      status === 'done' ? 'checked' : ''
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

    taskBlock.addEventListener('click', onTaskClickHandler);

    return taskBlock;
  }
}

export default TaskView;
