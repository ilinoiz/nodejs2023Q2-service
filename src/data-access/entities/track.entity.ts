import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column({ type: 'text', nullable: true })
  artistId: string | null;
  @Column({ type: 'text', nullable: true })
  albumId: string | null;
  @Column('smallint')
  duration: number;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}
