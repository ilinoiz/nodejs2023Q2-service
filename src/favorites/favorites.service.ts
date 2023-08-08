import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites.response.dto';
import { Favorite } from 'src/data-access/entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/data-access/entities/track.entity';
import { Album } from 'src/data-access/entities/album.entity';
import { Artist } from 'src/data-access/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async addTrack(id: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new UnprocessableEntityException();
    }

    let favorite = await this.getFavorite();

    if (!favorite) {
      favorite = {
        tracks: [track],
      };
    } else {
      favorite.tracks.push(track);
    }
    await this.favoritesRepository.save(favorite);
  }

  async addAlbum(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new UnprocessableEntityException();
    }

    let favorite = await this.getFavorite();

    if (!favorite) {
      favorite = {
        albums: [album],
      };
    } else {
      favorite.albums.push(album);
    }
    await this.favoritesRepository.save(favorite);
  }

  async addArtist(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new UnprocessableEntityException();
    }

    let favorite = await this.getFavorite();

    if (!favorite) {
      favorite = {
        artists: [artist],
      };
    } else {
      favorite.artists.push(artist);
    }
    await this.favoritesRepository.save(favorite);
  }

  async deleteTrack(id: string): Promise<void> {
    const favorite = await this.getFavorite();
    const track = favorite?.tracks.find((t) => t.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    favorite.tracks = favorite.tracks.filter((t) => t.id !== id);
    await this.favoritesRepository.save(favorite);
  }

  async deleteAlbum(id: string): Promise<void> {
    const favorite = await this.getFavorite();
    const album = favorite?.albums.find((t) => t.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    favorite.albums = favorite.albums.filter((t) => t.id !== id);
    await this.favoritesRepository.save(favorite);
  }

  async deleteArtist(id: string): Promise<void> {
    const favorite = await this.getFavorite();
    const artist = favorite?.artists.find((t) => t.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    favorite.artists = favorite.artists.filter((t) => t.id !== id);
    await this.favoritesRepository.save(favorite);
  }

  async getAll() {
    const result = await this.getFavorite();
    return this.mapToResponseDto(result);
  }

  private async getFavorite(): Promise<Favorite> {
    const favorite = await this.favoritesRepository.findOne({
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
      where: {},
    });

    return favorite;
  }

  private mapToResponseDto = (favorite: Favorite): FavoritesResponseDto => {
    const mappedFavorite: FavoritesResponseDto = {
      albums: favorite?.albums || [],
      artists: favorite?.artists || [],
      tracks: favorite?.tracks || [],
    };
    return mappedFavorite;
  };
}
