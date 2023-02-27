import dotenv from 'dotenv';
import fs from 'fs';

if (!fs.existsSync('.env')) {
  console.error('[ERROR] The .env file is missing.');
  process.exit(1);
}

console.log('[DEBUG] Loading environment variables');
dotenv.config();
console.log('[DEBUG] Environment variables loaded');

if (!process.env.PORT) {
  console.error('[ERROR] The PORT environment variable is missing.');
  process.exit(1);
}

if (!process.env.DATABASE_NAME) {
  console.error('[ERROR] The DATABASE_NAME environment variable is missing.');
  process.exit(1);
}
