import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('smallint')
  year: number;
  @Column({ type: 'text', nullable: true })
  artistId: string | null;
  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  artist: Artist;
  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
