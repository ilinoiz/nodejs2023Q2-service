import { Injectable } from '@nestjs/common';
import { Album } from '../entities/album.entity';

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

  getMany(ids: string[]): Album[] {
    return this.albumsDb.filter((album) => ids.includes(album.id));
  }

  // deleteArtist(artistId: string) {
  //   this.albumsDb.forEach((album) => {
  //     if (album.artistId === artistId) {
  //       album.artistId = null;
  //     }
  //   });
  // }
}
