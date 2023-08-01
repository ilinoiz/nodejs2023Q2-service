import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5430,
  username: 'myuser',
  password: 'mypassword',
  database: 'hls',
  entities: ['src/data-access/entities/*.ts'],
  synchronize: true,
  migrations: ['migrations/*.ts']
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
