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

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date = new Date();

  @OneToMany(() => Task, (task) => task.assignedUser)
  assignedTasks?: Task[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks?: Task[];

  @OneToMany(() => Project, project => project.createdBy)
  createdProjects?: Project[];

  @ManyToMany(() => Project, project => project.members)
  projects?: Project[];
}
