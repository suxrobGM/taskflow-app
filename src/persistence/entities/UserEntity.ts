import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import type {Relation} from 'typeorm';
import {Task} from './TaskEntity';
import {Project} from './ProjectEntity';

@Entity({name: 'users'})
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
  assignedTasks?: Relation<Task>[];

  @OneToMany(() => Task, (task) => task.createdByUser)
  createdTasks?: Relation<Task>[];

  @OneToMany(() => Project, project => project.createdByUser)
  createdProjects?: Relation<Project>[];

  @ManyToMany(() => Project, project => project.members)
  projects?: Relation<Project>[];
}
