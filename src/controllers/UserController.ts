import { Request, Response } from 'express';
import { addUser } from '../models/UserModel';

async function registerUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as NewUserRequest;

  const newUser = await addUser(email, password);
  console.log(`\nAdded new user: `);
  console.log(newUser);

  res.sendStatus(201);
}

export { registerUser };