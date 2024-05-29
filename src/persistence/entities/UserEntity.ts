import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import {Task} from './TaskEntity';
import {Project} from './ProjectEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({})
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date = new Date();

  @OneToMany(() => Task, (task) => task.assignedUser)
  assignedTasks?: Task[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks?: Task[];

  @ManyToMany(() => Project, project => project.members)
  projects?: Project[];
}
