import { PostRefactoring1690747998280 } from './1690747998280-PostRefactoring';
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
  migrations: [PostRefactoring1690747998280]
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
