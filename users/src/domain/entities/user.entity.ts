import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userid: string;

  @Column({ unique: true, nullable: true })
  profileName: string;

  @Column({ nullable: true })
  userTitle: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ nullable: true })
  profileUrl: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ default: 0 })
  followersCount: number;

  @Column({ default: 0 })
  followingCount: number;

  @Column({ default: 0 })
  connectionsCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
