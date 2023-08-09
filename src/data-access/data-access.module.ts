import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Artist } from './entities/artist.entity';
import { Favorite } from './entities/favorite.entity';
import { Track } from './entities/track.entity';
import { Album } from './entities/album.entity';
import { ConfigModule } from '@nestjs/config';
import { DataBaseOptions } from './ormconfig';
import { RefreshToken } from './entities/refreshToken.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...DataBaseOptions,
      entities: [User, Artist, Favorite, Track, Album, RefreshToken],
      logging: false,
    }),
  ],
  providers: [],
  exports: [],
})
export class DataAccessModule {}
