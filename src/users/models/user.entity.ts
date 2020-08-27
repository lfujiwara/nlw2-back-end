import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { WeeklyTimeWindow } from './weekly-time-window.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ name: 'username' })
  username: string;

  @Column()
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ default: '' })
  biography: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true, type: 'decimal' })
  hourlyRate: number;

  @OneToMany(
    type => WeeklyTimeWindow,
    weeklyTimeWindow => weeklyTimeWindow.user,
    { cascade: true },
  )
  weeklyTimeWindows: WeeklyTimeWindow[];

  @Column({ default: new Date(0) })
  lastLogin: Date;

  @UpdateDateColumn()
  lastModified: Date;
}
