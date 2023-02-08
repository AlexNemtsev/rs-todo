import Task from "../../interfaces/task";

class Loader {
  private static url = 'http://127.0.0.1:3000';

  public static async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${Loader.url}/tasks`, {
      method: 'GET',
    });

    return await response.json() as Task[];
  }

  public static addTask(task : Omit<Task, 'id'>): Promise<Response> {
    return fetch(`${Loader.url}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Loader;
