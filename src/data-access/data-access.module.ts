import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Artist } from './entities/artist.entity';
import { Favorite } from './entities/favorite.entity';
import { Track } from './entities/track.entity';
import { Album } from './entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5430,
      username: 'myuser',
      password: 'mypassword',
      database: 'hls',
      // entities: ['src/data-access/entities/*.ts'],
      entities: [User, Artist, Favorite, Track, Album],
      synchronize: true,
      logging: false
      // migrations: ['migrations/*.ts']
    }),
  ],
  providers: [],
  exports: [],
})
export class DataAccessModule {}
