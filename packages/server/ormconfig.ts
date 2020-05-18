import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';

config();

let port: number;

if (process.env.DATABASE_PORT) {
  port = parseInt(process.env.DATABASE_PORT, 10);
} else {
  port = 5432;
}

const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port,
  database: process.env.DATABASE_SCHEMA || 'speakrr',
  username: process.env.DATABASE_USERNAME || 'speakrr',
  password: process.env.DATABASE_PASSWORD || 'speakrr',

  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'src', 'db', 'migrations', '*.{ts,js}')],

  synchronize: false,

  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export = databaseConfig;
