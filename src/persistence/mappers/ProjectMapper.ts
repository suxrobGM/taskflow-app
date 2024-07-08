import {Project} from "../entities";
import {ProjectDto} from "../models";

export abstract class ProjectMapper {
  static toDto(entity: Project): ProjectDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }
}
