import dotenv from 'dotenv';
import fs from 'fs';

if (!fs.existsSync('.env')) {
  console.error('[ERROR] The .env file is missing.');
  process.exit(1);
}

dotenv.config();
