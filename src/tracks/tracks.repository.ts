import { Track } from './entities/track.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TracksRepository {
  private tracksDb: Track[] = [];

  create(user: Track) {
    this.tracksDb.push(user);
  }

  getAll(): Track[] {
    return this.tracksDb;
  }

  getById(id: string) {
    const user = this.tracksDb.find((user) => user.id === id);
    return user;
  }

  update(id: string, newUser: Track) {
    const userIndex = this.tracksDb.findIndex((user) => user.id === id);
    this.tracksDb[userIndex] = { ...newUser };
  }

  delete(id: string) {
    this.tracksDb = this.tracksDb.filter((user) => user.id !== id);
  }
}
