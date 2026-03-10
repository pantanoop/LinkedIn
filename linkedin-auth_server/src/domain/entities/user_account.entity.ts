import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserAccounts')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userid: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  displayName: string;
}
