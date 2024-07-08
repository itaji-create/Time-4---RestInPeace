import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session } from './Session';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chair: string;

  @Column()
  value: number;

  @ManyToOne(() => Session, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session: Session;
}
