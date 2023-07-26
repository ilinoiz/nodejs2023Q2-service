import { Track } from '../entities/track.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TracksRepository {
  private tracksDb: Track[] = [];

  create(track: Track) {
    this.tracksDb.push(track);
  }

  getAll(): Track[] {
    return this.tracksDb;
  }

  getById(id: string) {
    const track = this.tracksDb.find((track) => track.id === id);
    return track;
  }

  update(id: string, newTrack: Track) {
    const trackIndex = this.tracksDb.findIndex((track) => track.id === id);
    this.tracksDb[trackIndex] = { ...newTrack };
  }

  delete(id: string) {
    this.tracksDb = this.tracksDb.filter((track) => track.id !== id);
  }

  getMany(ids: string[]): Track[] {
    return this.tracksDb.filter((track) => ids.includes(track.id));
  }

  deleteArtist(artistId: string) {
    this.tracksDb.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
  
  deleteAlbum(albumId: string){
    this.tracksDb.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
