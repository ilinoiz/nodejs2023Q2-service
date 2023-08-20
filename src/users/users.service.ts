import { Injectable, Logger } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from '../data-access/entities/user.entity';
import { CreateUserResponseDto as UserResponseDto } from './dto/user-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { MyLogger } from 'src/logging/my-logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private myLogger: MyLogger
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const dateNow = new Date().toISOString();
    const user: User = {
      ...createUserDto,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    };
    user.password = await this.hashPassword(user.password);
    const result = await this.usersRepository.insert(user);
    return this.mapToResponseDto(user, result.raw[0].id);
  }

  async getAll(): Promise<UserResponseDto[]> {
    // this.myLogger.error('Doing something...');
    this.myLogger.error('test error');
    this.myLogger.debug('test debug');
    this.myLogger.log('test log');
    this.myLogger.warn('test warn');
    this.myLogger.verbose('test verbose');
    const users = await this.usersRepository.find();
    return users.map((user) => this.mapToResponseDto(user));
  }

  async getById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapToResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    const isSamePassword = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!isSamePassword) {
      throw new ForbiddenException();
    }

    const dateNow = new Date().toISOString();
    user.password = await this.hashPassword(updateUserDto.newPassword);
    user.version = user.version + 1;
    user.updatedAt = dateNow;
    await this.usersRepository.update(id, user);

    return this.mapToResponseDto(user);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    await this.usersRepository.delete(id);
  }

  private mapToResponseDto = (user: User, id?: string): UserResponseDto => {
    const { createdAt, login, updatedAt, version } = user;
    const mappedUser: UserResponseDto = {
      login,
      version,
      id: id || user.id,
      createdAt: new Date(createdAt).getTime(),
      updatedAt: new Date(updatedAt).getTime(),
    };
    return mappedUser;
  };

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, +process.env.CRYPT_SALT);
  }
}
