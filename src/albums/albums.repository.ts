import { Album } from './entities/album.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumsRepository {
  private albumsDb: Album[] = [];

  create(album: Album) {
    this.albumsDb.push(album);
  }

  getAll(): Album[] {
    return this.albumsDb;
  }

  getById(id: string) {
    const album = this.albumsDb.find((album) => album.id === id);
    return album;
  }

  update(id: string, newAlbum: Album) {
    const albumIndex = this.albumsDb.findIndex((album) => album.id === id);
    this.albumsDb[albumIndex] = { ...newAlbum };
  }

  delete(id: string) {
    this.albumsDb = this.albumsDb.filter((album) => album.id !== id);
  }
}
