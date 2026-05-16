import Knex from 'knex';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: join(__dirname, '../migrations'),
    loadExtensions: ['.js'],
  },
  seeds: {
    directory: join(__dirname, '../seeds'),
    loadExtensions: ['.js'],
  },
});

export default db;
