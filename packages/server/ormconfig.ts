import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  database: process.env.DATABASE_SCHEMA || 'speakrr',
  username: process.env.DATABASE_USERNAME || 'speakrr',
  password: process.env.DATABASE_PASSWORD || 'speakrr',

  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/src/db/migrations/*.{ts,js}'],

  synchronize: false,

  cli: {
    migrationsDir: __dirname + '/src/db/migrations',
  },
};

export = databaseConfig;
