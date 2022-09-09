import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DB_URL, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';

export const dbConnection = (): ConnectionOptions => {
  let options = {};

  if (DB_URL) {
    options = {
      url: DB_URL,
    };
  } else {
    options = {
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    };
  }

  return {
    ...options,
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  };
};
