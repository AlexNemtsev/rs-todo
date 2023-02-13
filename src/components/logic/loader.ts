import Task from '../../interfaces/task';

type TaskWOid = Omit<Task, 'id'>;

const enum Mode {
  create,
  update,
}

class Loader {
  private static url = 'http://127.0.0.1:3000';

  public static async getAllTasks(): Promise<Task[]> {
    return Loader.getTasks(false);
  }

  public static async getCompletedTask(): Promise<Task[]> {
    return Loader.getTasks(false, true);
  }

  public static async getTask(taskId: number): Promise<Task> {
    const response = await fetch(`${Loader.url}/tasks?id=${taskId}`, {
      method: 'GET',
    });

    return (await response.json()) as Task;
  }

  public static async getTasksInInterval(from: number, to: number) {
    const response = await fetch(
      `${Loader.url}/tasks?dueTo_gte=${from}&_lte=${to}`,
      {
        method: 'GET',
      },
    );

    return (await response.json()) as Task[];
  }

  public static async getRemovedTasks(): Promise<Task[]> {
    return Loader.getTasks(true);
  }

  private static alterTask(
    task: Partial<TaskWOid>,
    mode: Mode,
    id: number,
  ): Promise<Response> {
    const method = mode === Mode.create ? 'POST' : 'PATCH';
    const urlTail = mode === Mode.create ? '' : `/${id}`;

    return fetch(`${Loader.url}/tasks${urlTail}`, {
      method,
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static updateTask(taskId: number, task: Partial<TaskWOid>) {
    return Loader.alterTask(task, Mode.update, taskId);
  }

  private static async getTasks(
    removed: boolean,
    completed?: boolean,
  ): Promise<Task[]> {
    const completedQuery = completed ? '&status=done' : '';
    const response = await fetch(
      `${Loader.url}/tasks?removed=${String(removed)}${completedQuery}`,
      {
        method: 'GET',
      },
    );

    return (await response.json()) as Task[];
  }

  public static addTask(task: TaskWOid): Promise<Response> {
    return Loader.alterTask(task, Mode.create, 0);
  }
}

export default Loader;
