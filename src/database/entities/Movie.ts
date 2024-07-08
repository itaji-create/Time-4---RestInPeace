import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Session } from './Session';
@Entity()
@Unique(['name'])
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[]): string => value.join(','),
      from: (value: string): string[] => value.split(','),
    },
  })
  actors: string[];

  @Column()
  release_date: string;

  @OneToMany(() => Session, (session) => session.movie, { cascade: true })
  sessions: Session[];
}
