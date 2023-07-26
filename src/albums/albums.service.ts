import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { AlbumsRepository } from 'src/data-access/repositories/albums.repository';
import { FavoritesRepository } from 'src/data-access/repositories/favorites.repository';
import { TracksRepository } from 'src/data-access/repositories/tracks.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

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
    this.favoritesRepository.deleteAlbum(id);
    this.tracksRepository.deleteAlbum(id);
  }
}
