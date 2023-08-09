import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RefreshToken } from './refreshToken.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column('text')
  login: string;
  @Column('text')
  password: string;
  @Column('smallint')
  version: number;
  @Column('timestamp without time zone')
  createdAt: string;
  @Column('timestamp without time zone')
  updatedAt: string;
  @Column({ type: 'text', nullable: true })
  refreshTokenId?: string | null;
  @ManyToOne(() => RefreshToken, (refreshToken) => refreshToken.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'refreshTokenId' })
  refreshToken?: RefreshToken;
}
