import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Like } from './like.entity';
import { Repost } from './repost.entity';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  postId: string;

  @Column()
  userid: string;

  @Column()
  userName: string;

  @Column()
  userTitle: string;

  @Column('varchar')
  description: string;

  @Column('text', { nullable: true })
  profileUrl: string;

  @Column('text', { array: true, nullable: true })
  mediaUrls: string[];

  @Column({
    type: 'enum',
    enum: ['public', 'private'],
    default: 'public',
  })
  postType: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postedOn: Date;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Repost, (repost) => repost.post)
  reposts: Repost[];
}
