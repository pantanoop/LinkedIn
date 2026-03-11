import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('Likes')
@Unique(['userId', 'postId'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ type: 'uuid' })
  postId: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  post: Post;
}
