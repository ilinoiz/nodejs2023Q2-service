import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('boolean')
  grammy: boolean;
  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
