import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/data-access/entities/track.entity';
import { Repository } from 'typeorm';
import { TrackResponseDto } from './dto/track-response.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackResponseDto> {
    // const newTrack = { ...createTrackDto, id: uuidv4() };
    const result = await this.tracksRepository.insert(createTrackDto);
    const responsedDto: TrackResponseDto = {
      ...createTrackDto,
      id: result.raw[0].id,
    };
    return responsedDto;
  }

  async getAll(): Promise<TrackResponseDto[]> {
    const tracks = await this.tracksRepository.find();
    return tracks.map((track) => this.mapToResponseDto(track));
  }

  async getById(id: string): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }
    return this.mapToResponseDto(track);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }
    const newTrack = { ...track, ...updateTrackDto };
    await this.tracksRepository.update(id, newTrack);
    return this.mapToResponseDto(newTrack);
  }

  async delete(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }
    await this.tracksRepository.delete(id);
  }

  private mapToResponseDto = (track: Track, id?: string): TrackResponseDto => {
    const { name, artistId, albumId, duration } = track;
    const mappedTrack: TrackResponseDto = {
      id: id || track.id,
      albumId,
      artistId,
      duration,
      name,
    };
    return mappedTrack;
  };
}
