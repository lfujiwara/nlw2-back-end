import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class WeeklyTimeWindow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.weeklyTimeWindows,
  )
  user: User;

  @Column()
  weekDay: number;

  @Column()
  start: string;

  @Column()
  end: string;
}
