import { Request, Response } from 'express';
import { addUser } from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';

async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    if (!req.body.password || !req.body.email) {
      res
        .status(400)
        .json({ error: '[ERROR] Missing email or password property in request body.' });
      return;
    }
    const { email, password } = req.body as NewUserRequest;
    console.debug(`[DEBUG] Received request body: ${JSON.stringify(req.body)}`);

    const newUser = await addUser(email, password);
    console.debug(`[DEBUG] Added new user:\n${JSON.stringify(newUser, null, 2)}`);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err as Error);
    res.status(500).json(databaseErrorMessage);
    res.sendStatus(500);
  }
}

export { registerUser };
