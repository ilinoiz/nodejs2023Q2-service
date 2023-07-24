import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserResponseDto as UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private usersDb: User[] = [];

  create(createUserDto: CreateUserDto): UserResponseDto {
    const dateNow = Date.now();
    const user: User = {
      ...createUserDto,
      version: 1,
      id: uuidv4(),
      createdAt: dateNow,
      updatedAt: dateNow,
    };
    this.usersDb.push(user);
    return this.mapToResponseDto(user);
  }

  getAll(): UserResponseDto[] {
    return this.usersDb.map((user) => this.mapToResponseDto(user));
  }

  getById(id: string) {
    const user = this.usersDb.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapToResponseDto(user);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const userIndex = this.usersDb.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      throw new NotFoundException();
    }
    const user = this.usersDb[userIndex];
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    user.password = updateUserDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
    return this.mapToResponseDto(user);
  }

  delete(id: string) {
    const user = this.usersDb.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    this.usersDb = this.usersDb.filter((user) => user.id !== id);
  }

  private mapToResponseDto = (user: User): UserResponseDto => {
    const { password, ...createdUser } = user;
    return createdUser;
  };
}
