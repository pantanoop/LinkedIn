import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentId: string;

  @Column()
  postId: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  profileUrl: string;

  @Column({ nullable: true })
  parentId: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  post: Post;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @JoinColumn({ name: 'parentId', referencedColumnName: 'commentId' })
  parent: Comment;
}
