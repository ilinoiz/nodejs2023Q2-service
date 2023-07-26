import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataAccessModule]
})
export class AlbumsModule {}
