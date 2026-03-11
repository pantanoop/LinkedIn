// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('Posts')
// export class Post {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'uuid' })
//   postId: string;

//   @Column()
//   userid: string;

//   @Column()
//   userName: string;

//   @Column()
//   userTitle: string;

//   @Column('varchar')
//   description: string;

//   @Column('text')
//   profileUrl: string;

//   @Column('text', { array: true })
//   imageUrls: string[];

//   @Column()
//   postedOn: Date;

//   @Column({
//     type: 'enum',
//     enum: ['public', 'private'],
//     default: 'public',
//   })
//   postType: string;
// }

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Like } from './like.entity';

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
  imageUrls: string[];

  @Column()
  postedOn: Date;

  @Column({
    type: 'enum',
    enum: ['public', 'private'],
    default: 'public',
  })
  postType: string;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
