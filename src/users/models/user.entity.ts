import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

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

  @Column({ default: new Date(0) })
  lastLogin: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @DeleteDateColumn()
  deleted: Date;
}
