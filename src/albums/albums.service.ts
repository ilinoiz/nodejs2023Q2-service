import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsRepository } from './albums.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { ...createAlbumDto, id: uuidv4() };
    this.albumsRepository.create(newAlbum);
    return newAlbum;
  }

  getAll() {
    return this.albumsRepository.getAll();
  }

  getById(id: string) {
    const album = this.albumsRepository.getById(id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumsRepository.getById(id);
    if (!album) {
      throw new NotFoundException();
    }
    const newAlbum = { ...album, ...updateAlbumDto };
    this.albumsRepository.update(id, newAlbum);
    return newAlbum;
  }

  delete(id: string) {
    const album = this.albumsRepository.getById(id);
    if (!album) {
      throw new NotFoundException();
    }
    this.albumsRepository.delete(id);
  }
}
