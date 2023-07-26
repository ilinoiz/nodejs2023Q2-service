import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesResponse } from './dto/favorites.response.dto';
import { FavoritesRepository } from 'src/data-access/repositories/favorites.repository';
import { TracksRepository } from 'src/data-access/repositories/tracks.repository';
import { AlbumsRepository } from 'src/data-access/repositories/albums.repository';
import { ArtistsRepository } from 'src/data-access/repositories/artists.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TracksRepository,
    private readonly albumsRepository: AlbumsRepository,
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  addTrack(id: string) {
    const track = this.tracksRepository.getById(id);
    if (!track) {
      throw new UnprocessableEntityException();
    }
    this.favoritesRepository.addTrack(id);
  }

  addAlbum(id: string) {
    const album = this.albumsRepository.getById(id);
    if (!album) {
      throw new UnprocessableEntityException();
    }
    this.favoritesRepository.addAlbum(id);
  }

  addArtist(id: string) {
    const artist = this.artistsRepository.getById(id);
    if (!artist) {
      throw new UnprocessableEntityException();
    }
    this.favoritesRepository.addArtist(id);
  }

  deleteTrack(id: string) {
    const result = this.favoritesRepository.deleteTrack(id);
    if (!result) {
      throw new NotFoundException();
    }
  }

  deleteAlbum(id: string) {
    const result = this.favoritesRepository.deleteAlbum(id);
    if (!result) {
      throw new NotFoundException();
    }
  }

  deleteArtist(id: string) {
    const result = this.favoritesRepository.deleteArtist(id);
    if (!result) {
      throw new NotFoundException();
    }
  }

  getAll(): FavoritesResponse {
    const favorites = this.favoritesRepository.getAll();
    const response: FavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };
    response.albums = this.albumsRepository.getMany(favorites.albums);
    response.tracks = this.tracksRepository.getMany(favorites.tracks);
    response.artists = this.artistsRepository.getMany(favorites.artists);
    return response;
  }

  // getById(id: number) {
  //   return `This action returns a #${id} favorite`;
  // }

  // update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
  //   return `This action updates a #${id} favorite`;
  // }

  // delete(id: number) {
  //   return `This action removes a #${id} favorite`;
  // }
}
