import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataAccessModule],
})
export class UsersModule {}
