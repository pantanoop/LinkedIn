import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('Reposts')
export class Repost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  userName: string;

  @Column({ type: 'uuid' })
  postId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  repostedOn: Date;

  @ManyToOne(() => Post, (post) => post.reposts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  post: Post;
}
