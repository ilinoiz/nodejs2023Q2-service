import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data-access/entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataAccessModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
