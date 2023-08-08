import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/data-access/entities/favorite.entity';
import { Track } from 'src/data-access/entities/track.entity';
import { Artist } from 'src/data-access/entities/artist.entity';
import { Album } from 'src/data-access/entities/album.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([Favorite, Track, Album, Artist]),
  ],
})
export class FavoritesModule {}
