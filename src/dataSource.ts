import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  entities: ['dist/entities/*.js'],
  type: 'sqlite',
  database: process.env.DATABASE_NAME ?? 'You Forgot to set DATABASE_NAME in .env',
});

try {
  await AppDataSource.initialize();

  console.debug('[DEBUG] Connected to the database.');
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`[ERROR] ${error.message}\n\t${error.stack}`);
    throw error;
  } else {
    console.error(`[ERROR] ${error}`);
    throw error;
  }
}
