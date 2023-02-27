import 'reflect-metadata';
import { DataSource } from 'typeorm';
import glob from 'glob';
import { promisify } from 'util';

const globPromise = promisify(glob);

const globs = await globPromise('dist/entities/*.js');

const entities = (
  await Promise.all(globs.map((entity) => import(entity.replace('dist/', './'))))
).map((entity) => entity[Object.keys(entity)[0]]);

process.argv.push('--harmony-top-level-await');

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  entities,
  type: 'sqlite',
  database: process.env.DATABASE_NAME ?? 'You Forgot to set DATABASE_NAME in .env',
});

try {
  console.debug('[DEBUG] Initializing the database.');
  await AppDataSource.initialize();
  console.debug('[DEBUG] Connected to the database.');
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(`[ERROR] ${error.message}\n\t${error.stack}`);

    // We throw the error so that the application will exit with an error code of 1.
    throw error;
  } else {
    console.error(`[ERROR] ${error}`);

    // We throw the error so that the application will exit with an error code of 1.
    throw error;
  }
}
