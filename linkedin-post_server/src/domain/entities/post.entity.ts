import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  postId: string;

  @Column()
  userid: string;

  @Column('varchar')
  description: string;

  @Column('text', { array: true })
  imageUrls: string[];

  @Column({
    type: 'enum',
    enum: ['public', 'private'],
    default: 'public',
  })
  postType: string;

  // @Column({ unique: true, nullable: true })
  // profileImage: string;
}
