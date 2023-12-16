import { Client } from "src/clients/entities/client.entity";
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNumber: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  done?: boolean;

  @Column()
  clientNumber: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Client, (client) => client.tasks, { eager: true })
  client: Client;
}
