import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from '../data-access/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserResponseDto as UserResponseDto } from './dto/user-response.dto';
import { UsersRepository } from 'src/data-access/repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectRepository(User)
    private postgresRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const dateNow = new Date().toISOString();
    const user: User = {
      ...createUserDto,
      version: 1,
      // id: uuidv4(),
      createdAt: dateNow,
      updatedAt: dateNow,
    };
    this.usersRepository.create(user);
    await this.postgresRepository.insert(user);
    return this.mapToResponseDto(user);
  }

  getAll(): UserResponseDto[] {
    return this.usersRepository
      .getAll()
      .map((user) => this.mapToResponseDto(user));
  }

  getById(id: string) {
    const user = this.usersRepository.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapToResponseDto(user);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.usersRepository.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    user.password = updateUserDto.newPassword;
    user.version = user.version + 1;
    // user.updatedAt = Date.now();
    this.usersRepository.update(id, user);
    return this.mapToResponseDto(user);
  }

  delete(id: string) {
    const user = this.usersRepository.getById(id);
    if (!user) {
      throw new NotFoundException();
    }
    this.usersRepository.delete(id);
  }

  private mapToResponseDto = (user: User): UserResponseDto => {
    const { password, ...createdUser } = user;
    return createdUser;
  };
}
