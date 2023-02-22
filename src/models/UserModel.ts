/* import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> { */
/* try { */
/*   let newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;

  newUser = await userRepository.save(newUser);

  console.debug(`[DEBUG] Added new user:\n${JSON.stringify(newUser, null, 2)}`);

  return newUser; */
/* } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${error.message}\n\t${error.stack}`);
      throw error;
    } else {
      console.error(`[ERROR] ${error}`);
      throw error;
    }
  } */
/* }

export { addUser }; */

import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);
async function addUser(email: string, passwordHash: string): Promise<User> {
  let newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser = await userRepository.save(newUser);
  return newUser;
}
export { addUser };
