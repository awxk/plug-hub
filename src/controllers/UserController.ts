import { Request, Response } from 'express';
import argon2 from 'argon2';
import { addUser, getUserByEmail } from '../models/UserModel';
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
    const passwordHash = await argon2.hash(password);
    console.debug(`[DEBUG] Received request body: ${JSON.stringify(req.body)}`);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: '[ERROR] A user with that email already exists.' });
      return;
    }

    const newUser = await addUser(email, passwordHash);
    console.debug(`[DEBUG] Added new user:\n${JSON.stringify(newUser, null, 2)}`);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err as Error);
    res.status(500).json(databaseErrorMessage);
    res.sendStatus(500);
  }
}

async function login(req: Request, res: Response): Promise<void> {
  try {
    if (!req.body.password || !req.body.email) {
      res
        .status(400)
        .json({ error: '[ERROR] Missing email or password property in request body.' });
      return;
    }
    const { email, password } = req.body as NewUserRequest;
    console.debug(`[DEBUG] Received request body: ${JSON.stringify(req.body)}`);

    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: '[ERROR] Incorrect username or password.' });
      return;
    }

    const passwordMatch = await argon2.verify(user.passwordHash, password);
    if (!passwordMatch) {
      res.status(404).json({ error: '[ERROR] Incorrect username or password.' });
      return;
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err as Error);
    res.status(500).json(databaseErrorMessage);
  }
}

export { registerUser, login };
