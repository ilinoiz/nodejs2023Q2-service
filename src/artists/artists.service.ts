import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsRepository } from './artists.repository';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = { ...createArtistDto, id: uuidv4() };
    this.artistsRepository.create(newArtist);
    return newArtist;
  }

  getAll() {
    return this.artistsRepository.getAll();
  }

  getById(id: string) {
    const artist = this.artistsRepository.getById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistsRepository.getById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    const newArtist = { ...artist, ...updateArtistDto };
    this.artistsRepository.update(id, newArtist);
    return newArtist;
  }

  delete(id: string) {
    const artist = this.artistsRepository.getById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    this.artistsRepository.delete(id);
  }
}
