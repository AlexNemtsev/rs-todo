import Priority from './priority';
import TaskStatus from './status';

interface Task {
  id: number;
  task: string;
  listId: number;
  createdAt: number;
  removed: boolean;
  priority?: Priority;
  desc?: string;
  status?: TaskStatus;
  statusAt?: number;
  dueTo?: Date | number;
}

export default Task;
