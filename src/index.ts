import './config';
import 'express-async-errors';
import express, { Express } from 'express';
import { registerUser } from './controllers/UserController';

const app: Express = express();
app.use(express.json());

const { PORT } = process.env;

app.post('/api/users', registerUser);

app.listen(PORT, () => {
  console.log(`[ALERT] Server started at http://localhost:${PORT}`);
});

process.on('uncaughtException', (error: Error) => {
  console.error(`[ERROR] Uncaught exception: ${error.message}\n\t${error.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error(`[ERROR] Unhandled promise rejection: ${reason}\n\t${promise}`);
  process.exit(1);
});
