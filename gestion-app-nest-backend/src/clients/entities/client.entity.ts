import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientNumber: number;

  @Column()
  fullName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  paymentMethod: string;

  @Column()
  amount: number;

  @Column()
  debt: boolean;

  @Column()
  comments?: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Task, (task) => task.clientNumber, { eager: true })
  tasks: Task[];
}
