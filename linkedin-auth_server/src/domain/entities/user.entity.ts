import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userid: string;

  @Column({ unique: true, nullable: true })
  profileName: string;

  // @Column({ unique: true, nullable: true })
  // profileImage: string;
}
