import {Task} from "@/persistence/entities";
import {TaskDto} from "@/persistence/models";

export abstract class TaskMapper {
  static toDto(entity: Task): TaskDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      priority: entity.priority,
      status: entity.status,
      createdDate: entity.createdDate,
      dueDate: entity.dueDate,
    };
  }
}
