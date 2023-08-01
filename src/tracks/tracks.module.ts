import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/data-access/entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DataAccessModule, TypeOrmModule.forFeature([Track])],
})
export class TracksModule {}
