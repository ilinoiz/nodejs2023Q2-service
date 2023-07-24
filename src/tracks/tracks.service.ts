import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TracksService {
  private tracksDb: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const newTrack = { ...createTrackDto, id: uuidv4() };
    this.tracksDb.push(newTrack);
    return newTrack;
  }

  getAll() {
    return this.tracksDb;
  }

  getById(id: string) {
    const track = this.tracksDb.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    let track = this.tracksDb.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    track = { ...track, ...updateTrackDto };
    return track;
  }

  delete(id: string) {
    const track = this.tracksDb.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    this.tracksDb = this.tracksDb.filter((track) => track.id !== id);
  }
}
