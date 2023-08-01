import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from 'src/data-access/entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumResponseDto } from './dto/album-response.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumResponseDto> {
    // const newAlbum = { ...createAlbumDto, id: uuidv4() };
    const result = await this.albumsRepository.insert(createAlbumDto);
    const responsedDto: AlbumResponseDto = {
      ...createAlbumDto,
      id: result.raw[0].id,
    };
    return responsedDto;
  }

  async getAll(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumsRepository.find();
    return albums.map((artist) => this.mapToResponseDto(artist));
  }

  async getById(id: string): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    return this.mapToResponseDto(album);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    const newAlbum = { ...album, ...updateAlbumDto };
    await this.albumsRepository.update(id, newAlbum);
    return this.mapToResponseDto(newAlbum);
  }

  async delete(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    await this.albumsRepository.delete(id);
  }

  private mapToResponseDto = (album: Album, id?: string): AlbumResponseDto => {
    const { name, artistId, year } = album;
    const mappedAlbum: AlbumResponseDto = {
      id: id || album.id,
      name,
      artistId,
      year,
    };
    return mappedAlbum;
  };
}
