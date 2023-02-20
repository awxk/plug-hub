import './config';
import 'express-async-errors'; 
import express, { Express } from 'express';
import { registerUser } from './controllers/UserController';

const app: Express = express();
const { PORT } = process.env;

app.post('/api/users', registerUser);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});