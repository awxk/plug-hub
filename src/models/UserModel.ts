import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> {
  try {
    const newUser = new User();
    newUser.email = email;
    newUser.passwordHash = passwordHash;

    await userRepository.save(newUser);

    return newUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${error.message}\n\t${error.stack}`);
      throw error;
    } else {
      console.error(`[ERROR] ${error}`);
      throw error;
    }
  }
}

export { addUser };
