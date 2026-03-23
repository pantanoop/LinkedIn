import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  participants: string;

  @Column({ nullable: true })
  lastMessage: string;

  @Column({ nullable: true })
  lastMessageSenderId: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
