import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DataAccessModule],
})
export class ArtistsModule {}
