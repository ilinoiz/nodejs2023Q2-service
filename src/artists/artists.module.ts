import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/data-access/entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DataAccessModule, TypeOrmModule.forFeature([Artist])],
})
export class ArtistsModule {}
