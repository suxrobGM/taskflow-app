import AppDataSource from '../DataSource';
import {User} from '../entities';
import {ensureDatabaseInitialized} from '../InitDatabase';

export class UserRepository {
  private readonly userRepository = AppDataSource.getRepository(User);

  async tryCreateUser(options: TryCreateUserOptions): Promise<User> {
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

    return user;
  }
}

interface TryCreateUserOptions {
  email: string;
  firstName: string;
  lastName: string;
}
