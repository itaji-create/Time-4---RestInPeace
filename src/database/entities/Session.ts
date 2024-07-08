import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Movie } from './Movie';
import { Ticket } from './Ticket';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  room: string;

  @Column()
  capacity: number;

  @Column()
  day: string;

  @Column()
  time: string;

  @OneToMany(() => Ticket, (ticket) => ticket.session, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tickets: Ticket[];
}
