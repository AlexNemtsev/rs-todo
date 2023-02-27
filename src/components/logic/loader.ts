import Priority from '../../interfaces/priority';
import Task from '../../interfaces/task';
import TaskList from '../../interfaces/task-List';

type TaskWOid = Omit<Task, 'id'>;
type TaskListWOid = Omit<TaskList, 'id'>;

interface ParamsForGetTasks {
  removed: boolean;
  completed?: boolean;
  listId?: number;
  priority?: Priority;
}

const enum Mode {
  create,
  update,
}

class Loader {
  private static url = 'https://opaque-bumpy-cacao.glitch.me';

  public static getAllTasks(): Promise<Task[]> {
    return Loader.getTasks({ removed: false });
  }

  public static getCompletedTask(): Promise<Task[]> {
    return Loader.getTasks({ removed: false, completed: true });
  }

  public static getTasksFromList(listId: number): Promise<Task[]> {
    return Loader.getTasks({ removed: false, completed: false, listId });
  }

  public static getTasksByPriority(taskPriority: Priority): Promise<Task[]> {
    return Loader.getTasks({ removed: false, priority: taskPriority});
  }

  public static async getTask(taskId: number): Promise<Task> {
    const response: Response = await fetch(`${Loader.url}/tasks/${taskId}`, {
      method: 'GET',
    });
    const res = (await response.json()) as Task;
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
    return Loader.getTasks({ removed: true });
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

  private static async getTasks({
    removed,
    completed,
    listId,
    priority,
  }: ParamsForGetTasks): Promise<Task[]> {
    const completedQuery = completed ? '&status=done' : '';
    const listQuery = listId ? `&listId=${listId}` : '';
    const priorityQuery = priority !== undefined ? `&priority=${priority}` : '';
    const response = await fetch(
      `${Loader.url}/tasks?removed=${String(
        removed,
      )}${completedQuery}${listQuery}${priorityQuery}`,
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

    const [res] = (await response.json()) as [TaskList];
    return res;
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

  public static async deleteTaskList(taskId: number): Promise<Response> {
    const tasksToBeRemoved: Task[] = await Loader.getTasksFromList(taskId);
    await Promise.all(
      tasksToBeRemoved.map((task) => Loader.deleteTask(task.id)),
    );

    return Loader.deleteObject(taskId, 'lists');
  }

  public static deleteTask(id: number): Promise<Response> {
    return Loader.deleteObject(id, 'tasks');
  }

  private static deleteObject(
    id: number,
    list: 'tasks' | 'lists',
  ): Promise<Response> {
    return fetch(`${Loader.url}/${list}/${id}`, { method: 'DELETE' });
  }
}

export default Loader;
