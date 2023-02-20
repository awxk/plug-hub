import { Request, Response } from 'express';
import { addUser } from '../models/UserModel';

async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as NewUserRequest;
    console.debug(`[DEBUG] Received request body: ${JSON.stringify(req.body)}`);

    const newUser = await addUser(email, password);
    console.debug(`[DEBUG] Added new user:\n${JSON.stringify(newUser, null, 2)}`);

    res.sendStatus(201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${error.message}\n\t${error.stack}`);
    } else {
      console.error(`[ERROR] ${error}`);
    }
    res.sendStatus(500);
  }
}

export { registerUser };
