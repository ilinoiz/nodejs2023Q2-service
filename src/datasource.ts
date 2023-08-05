import { DataSource } from 'typeorm';
import { DataBaseOptions } from './ormconfig';

export const AppDataSource = new DataSource({
  ...DataBaseOptions,
  entities: ['src/data-access/entities/*.ts'],
  synchronize: true,
  migrations: ['migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
