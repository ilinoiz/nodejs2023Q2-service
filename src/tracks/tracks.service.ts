import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TracksRepository } from 'src/data-access/repositories/tracks.repository';
import { FavoritesRepository } from 'src/data-access/repositories/favorites.repository';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = { ...createTrackDto, id: uuidv4() };
    this.tracksRepository.create(newTrack);
    return newTrack;
  }

  getAll() {
    return this.tracksRepository.getAll();
  }

  getById(id: string) {
    const track = this.tracksRepository.getById(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.tracksRepository.getById(id);
    if (!track) {
      throw new NotFoundException();
    }
    const newTrack = { ...track, ...updateTrackDto };
    this.tracksRepository.update(id, newTrack);
    return newTrack;
  }

  delete(id: string) {
    const track = this.tracksRepository.getById(id);
    if (!track) {
      throw new NotFoundException();
    }
    this.tracksRepository.delete(id);
    this.favoritesRepository.deleteTrack(id);
  }
}
