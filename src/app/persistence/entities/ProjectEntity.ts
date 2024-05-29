import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {Task} from './TaskEntity';
import {User} from './UserEntity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('text')
  description?: string;

  @Column('date', {
    default: new Date(),
  })
  createdDate: Date = new Date();

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks?: Task[];

  @ManyToMany(() => User)
  @JoinTable()
  members?: User[];
}
