import Priority from './priority';
import TaskStatus from './status';

interface Task {
  id?: number;
  task: string;
  list: string;
  createdAt: Date;
  removed: boolean;
  priority?: Priority;
  desc?: string;
  status?: TaskStatus;
  statusAt?: Date;
  dueTo?: Date;
}

export default Task;
