import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToMany(() => Artist, { onDelete: 'SET NULL' })
  @JoinTable()
  artists?: Artist[];

  @ManyToMany(() => Album, { onDelete: 'SET NULL' })
  @JoinTable()
  albums?: Album[];

  @ManyToMany(() => Track, { onDelete: 'SET NULL' })
  @JoinTable()
  tracks?: Track[];
}
