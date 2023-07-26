import { Module } from '@nestjs/common';
import { FavoritesRepository } from './repositories/favorites.repository';
import { AlbumsRepository } from './repositories/albums.repository';
import { TracksRepository } from './repositories/tracks.repository';
import { ArtistsRepository } from './repositories/artists.repository';
import { UsersRepository } from './repositories/users.repository';

@Module({
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
