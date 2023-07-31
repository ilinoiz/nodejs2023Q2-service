import { Module } from '@nestjs/common';
import { FavoritesRepository } from './repositories/favorites.repository';
import { AlbumsRepository } from './repositories/albums.repository';
import { TracksRepository } from './repositories/tracks.repository';
import { ArtistsRepository } from './repositories/artists.repository';
import { UsersRepository } from './repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5430,
      username: 'myuser',
      password: 'mypassword',
      database: 'hls',
      entities: [User],
      synchronize: true,
      migrations: [],
    }),
  ],
  providers: [
    FavoritesRepository,
    AlbumsRepository,
    TracksRepository,
    ArtistsRepository,
    UsersRepository,
  ],
  exports: [
    FavoritesRepository,
    AlbumsRepository,
    TracksRepository,
    ArtistsRepository,
    UsersRepository,
  ],
})
export class DataAccessModule {}
