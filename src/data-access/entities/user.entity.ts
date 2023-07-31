import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column("text")
  login: string;
  @Column("text")
  password: string;
  @Column()
  version: number;
  @Column("timestamp without time zone")
  createdAt: string;
  @Column("timestamp without time zone")
  updatedAt: string;
}
