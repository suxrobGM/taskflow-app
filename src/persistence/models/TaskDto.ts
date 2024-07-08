import {TaskPriority, TaskStatus} from "../enums";

export interface TaskDto {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdDate: Date;
  dueDate?: Date;
}
