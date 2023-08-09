import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column('text')
  token: string;
  @Column('timestamp without time zone')
  expirationDate: string;
  @OneToMany(() => User, (user) => user.refreshToken)
  users?: User[];
}
