import { Injectable } from '@nestjs/common';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private artistsDb: Artist[] = [];

  create(artist: Artist) {
    this.artistsDb.push(artist);
  }

  getAll(): Artist[] {
    return this.artistsDb;
  }

  getById(id: string) {
    const artist = this.artistsDb.find((artist) => artist.id === id);
    return artist;
  }

  update(id: string, newArtist: Artist) {
    const artistIndex = this.artistsDb.findIndex((artist) => artist.id === id);
    this.artistsDb[artistIndex] = { ...newArtist };
  }

  delete(id: string) {
    this.artistsDb = this.artistsDb.filter((artist) => artist.id !== id);
  }

  getMany(ids: string[]): Artist[] {
    return this.artistsDb.filter((artist) => ids.includes(artist.id));
  }
}
