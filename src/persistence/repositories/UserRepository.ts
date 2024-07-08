import AppDataSource from "../DataSource";
import {ensureDatabaseInitialized} from "../InitDatabase";
import {User} from "../entities";
import {UserMapper} from '../mappers';
import {CreateUserDto, UserDto} from "../models";

export class UserRepository {
  private readonly userRepository = AppDataSource.getRepository(User);

  async tryCreateUser(options: CreateUserDto): Promise<UserDto> {
    await ensureDatabaseInitialized();
    let user = await this.userRepository.findOneBy({email: options.email});

    if (!user) {
      user = this.userRepository.create({
        email: options.email,
        firstName: options.firstName,
        lastName: options.lastName,
      });
      await this.userRepository.save(user);
    }

    return UserMapper.toDto(user);
  }
}


