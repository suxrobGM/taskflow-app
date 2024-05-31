import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import type {Relation} from 'typeorm';
import {User} from './UserEntity';
import {TaskPriority} from './TaskPriority';
import {TaskStatus} from './TaskStatus';
import {Project} from './ProjectEntity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description?: string;

  @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN})
  status: TaskStatus = TaskStatus.OPEN;

  @Column({type: 'enum', enum: TaskPriority, default: TaskPriority.LOW})
  priority: TaskPriority = TaskPriority.LOW;

  @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date = new Date();

  @Column('date')
  dueDate?: Date;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  assignedUser?: Relation<User>;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  createdByUser?: Relation<User>;

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Relation<Project>;
}
