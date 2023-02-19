import Task from '../../interfaces/task';
import Utils from '../../utils/utils';
import TaskList from '../../interfaces/task-List';

type TaskWOid = Omit<Task, 'id'>;
type TaskListWOid = Omit<TaskList, 'id'>;

const enum Mode {
  create,
  update,
}

class Loader {
  private static url = 'http://127.0.0.1:3000';

  public static getAllTasks(): Promise<Task[]> {
    return Loader.getTasks(false);
  }

  public static getCompletedTask(): Promise<Task[]> {
    return Loader.getTasks(false, true);
  }

  public static getTasksFromList(taskList: string): Promise<Task[]> {
    return Loader.getTasks(false, false, taskList);
  }

  public static async getTask(taskId: number): Promise<Task> {
    const response: Response = await fetch(`${Loader.url}/tasks?id=${taskId}`, {
      method: 'GET',
    });
    const [res] = (await response.json()) as [Task];
    return res;
  }

  public static async getTasksInInterval(
    from: number,
    to: number,
  ): Promise<Task[]> {
    const response = await fetch(
      `${Loader.url}/tasks?dueTo_gte=${from}&dueTo_lte=${to}`,
      {
        method: 'GET',
      },
    );

    return (await response.json()) as Task[];
  }

  public static async getRemovedTasks(): Promise<Task[]> {
    return Loader.getTasks(true);
  }

  private static alterObject(
    object: Partial<TaskWOid> | Partial<TaskListWOid>,
    list: 'tasks' | 'lists',
    mode: Mode,
    id: number,
  ): Promise<Response> {
    const method = mode === Mode.create ? 'POST' : 'PATCH';
    const urlTail = mode === Mode.create ? '' : `/${id}`;

    return fetch(`${Loader.url}/${list}${urlTail}`, {
      method,
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static updateTask(
    taskId: number,
    task: Partial<TaskWOid>,
  ): Promise<Response> {
    return Loader.alterObject(task, 'tasks', Mode.update, taskId);
  }

  private static async getTasks(
    removed: boolean,
    completed?: boolean,
    taskList?: string,
  ): Promise<Task[]> {
    const completedQuery = completed ? '&status=done' : '';
    const listQuery = taskList ? `&list=${taskList}` : '';
    const response = await fetch(
      `${Loader.url}/tasks?removed=${String(
        removed,
      )}${completedQuery}${listQuery}`,
      {
        method: 'GET',
      },
    );

    return (await response.json()) as Task[];
  }

  public static addTask(task: TaskWOid): Promise<Response> {
    return Loader.alterObject(task, 'tasks', Mode.create, 0);
  }

  public static async duplicateTask(taskId: number): Promise<Response> {
    const task: Task = await Loader.getTask(taskId);
    const copiedTask: TaskWOid = (({ id, ...obj }) => obj)(task);
    copiedTask.createdAt = Number(new Date());

    return Loader.alterObject(copiedTask, 'tasks', Mode.create, 0);
  }

  public static async getLists(): Promise<TaskList[]> {
    const response = await fetch(`${Loader.url}/lists`, { method: 'GET' });

    return (await response.json()) as TaskList[];
  }

  public static async getList(id: number): Promise<TaskList> {
    const response = await fetch(`${Loader.url}/lists?id=${id}`, {
      method: 'GET',
    });

    return (await response.json()) as TaskList;
  }

  public static createTaskList(taskList: TaskListWOid): Promise<Response> {
    return Loader.alterObject(taskList, 'lists', Mode.create, 0);
  }

  public static updateTaskList(
    listId: number,
    taskList: Partial<TaskListWOid>,
  ): Promise<Response> {
    return Loader.alterObject(taskList, 'lists', Mode.update, listId);
  }

  public static async deleteTaskList(taskList: TaskList): Promise<Response> {
    const tasksToBeRemoved: Task[] = await Loader.getTasksFromList(
      taskList.name,
    );
    await Promise.all(
      tasksToBeRemoved.map((task) => Loader.deleteTask(task.id)),
    );

    return Loader.deleteObject(taskList.id, 'lists');
  }

  public static deleteTask(id: number): Promise<Response> {
    return Loader.deleteObject(id, 'tasks');
  }

  public static deleteObject(
    id: number,
    list: 'tasks' | 'lists',
  ): Promise<Response> {
    return fetch(`${Loader.url}/${list}/${id}`, { method: 'DELETE' });
  }

  public static async getListTasks(listName: string): Promise<Task[]> {
    let tasks: Task[] = [];

    switch (listName) {
      case 'all':
        tasks = await Loader.getAllTasks();
        break;
      case 'today':
        tasks = await Loader.getTasksInInterval(...Utils.getIntevalInMs(0, 0));
        break;
      case 'tomorrow':
        tasks = await Loader.getTasksInInterval(...Utils.getIntevalInMs(1, 1));
        break;
      case 'nextDays':
        tasks = await Loader.getTasksInInterval(...Utils.getIntevalInMs(0, 7));
        break;
      case 'completed':
        tasks = await Loader.getCompletedTask();
        break;
      case 'trash':
        tasks = await Loader.getRemovedTasks();
        break;
      default:
        tasks = await Loader.getAllTasks();
        break;
    }

    return tasks;
  }
}

export default Loader;
