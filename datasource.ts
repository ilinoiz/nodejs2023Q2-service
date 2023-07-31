
import { InitialMigration1690751936913 } from './1690751936913-InitialMigration';
import { User } from './src/data-access/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5430,
  username: 'myuser',
  password: 'mypassword',
  database: 'hls',
  entities: [User],
  synchronize: true,
  migrations: [InitialMigration1690751936913]
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
