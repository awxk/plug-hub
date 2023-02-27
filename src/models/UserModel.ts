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

async function getUserByEmail(email: string): Promise<User | null> {
  if (!email) {
    throw new Error('[ERROR] Email is required');
  }

  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();
  if (!user) {
    throw new Error(`[ERROR] User with email ${email} not found`);
  }

  return user;
}

export { addUser, getUserByEmail };
