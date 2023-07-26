import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DataAccessModule],
})
export class TracksModule {}
