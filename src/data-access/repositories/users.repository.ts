import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private usersDb: User[] = [];

  create(user: User) {
    this.usersDb.push(user);
  }

  getAll(): User[] {
    return this.usersDb;
  }

  getById(id: string) {
    const user = this.usersDb.find((user) => user.id === id);
    return user;
  }

  update(id: string, newUser: User) {
    const userIndex = this.usersDb.findIndex((user) => user.id === id);
    this.usersDb[userIndex] = { ...newUser };
  }

  delete(id: string) {
    this.usersDb = this.usersDb.filter((user) => user.id !== id);
  }
}
