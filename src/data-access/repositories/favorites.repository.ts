import { Favorite } from '../entities/favorite.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesRepository {
  constructor() {}
  private favoritesDb: Favorite = {
    artists: [],
    tracks: [],
    albums: [],
  };

  addTrack(id: string) {
    if (!this.favoritesDb.tracks.includes(id)) {
      this.favoritesDb.tracks.push(id);
    }
  }

  addAlbum(id: string) {
    if (!this.favoritesDb.albums.includes(id)) {
      this.favoritesDb.albums.push(id);
    }
  }

  addArtist(id: string) {
    if (!this.favoritesDb.artists.includes(id)) {
      this.favoritesDb.artists.push(id);
    }
  }

  deleteTrack(id: string) {
    if (this.favoritesDb.tracks.includes(id)) {
      this.favoritesDb.tracks = this.favoritesDb.tracks.filter(
        (trackId) => trackId !== id,
      );
      return true;
    }
    return false;
  }

  deleteAlbum(id: string) {
    if (this.favoritesDb.albums.includes(id)) {
      this.favoritesDb.albums = this.favoritesDb.albums.filter(
        (albumId) => albumId !== id,
      );
      return true;
    }
    return false;
  }

  deleteArtist(id: string) {
    if (this.favoritesDb.artists.includes(id)) {
      this.favoritesDb.artists = this.favoritesDb.artists.filter(
        (artistId) => artistId !== id,
      );
      return true;
    }
    return false;
  }

  getAll() {
    return this.favoritesDb;
  }

  //   create(album: Album) {
  //     this.albumsDb.push(album);
  //   }

  //   getAll(): Album[] {
  //     return this.albumsDb;
  //   }

  //   getById(id: string) {
  //     const album = this.albumsDb.find((album) => album.id === id);
  //     return album;
  //   }

  //   update(id: string, newAlbum: Album) {
  //     const albumIndex = this.albumsDb.findIndex((album) => album.id === id);
  //     this.albumsDb[albumIndex] = { ...newAlbum };
  //   }

  //   delete(id: string) {
  //     this.albumsDb = this.albumsDb.filter((album) => album.id !== id);
  //   }
}
