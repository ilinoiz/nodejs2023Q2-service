import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/data-access/entities/artist.entity';
import { Repository } from 'typeorm';
import { ArtistResponseDto } from './dto/artist-response.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistResponseDto> {
    // const newArtist = { ...createArtistDto, id: uuidv4() };
    const result = await this.artistsRepository.insert(createArtistDto);
    const responsedDto: ArtistResponseDto = {
      ...createArtistDto,
      id: result.raw[0].id,
    };
    return responsedDto;
  }

  async getAll(): Promise<ArtistResponseDto[]> {
    const artists = await this.artistsRepository.find();
    return artists.map((artist) => this.mapToResponseDto(artist));
  }

  async getById(id: string): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    return this.mapToResponseDto(artist);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    const newArtist = { ...artist, ...updateArtistDto };
    await this.artistsRepository.update(id, newArtist);
    return this.mapToResponseDto(newArtist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    await this.artistsRepository.delete(id);
  }

  private mapToResponseDto = (
    artist: Artist,
    id?: string,
  ): ArtistResponseDto => {
    const { grammy, name } = artist;
    const mappedArtist: ArtistResponseDto = {
      id: id || artist.id,
      grammy,
      name,
    };
    return mappedArtist;
  };
}
