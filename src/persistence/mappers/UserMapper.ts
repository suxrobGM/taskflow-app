import {User} from "../entities";
import {UserDto} from "../models";

export abstract class UserMapper {
  static toDto(entity: User): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
    };
  }
}
