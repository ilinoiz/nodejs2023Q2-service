import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { Album } from 'src/data-access/entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataAccessModule, TypeOrmModule.forFeature([Album])],
})
export class AlbumsModule {}
