import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institutionName: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  fieldOfStudy: string;

  @Column({ nullable: true })
  startMonth: string;

  @Column({ nullable: true })
  startYear: string;

  @Column({ nullable: true })
  endMonth: string;

  @Column({ nullable: true })
  endYear: string;

  @ManyToOne(() => User, (user) => user.educations, {
    onDelete: 'CASCADE',
  })
  user: User;
}
