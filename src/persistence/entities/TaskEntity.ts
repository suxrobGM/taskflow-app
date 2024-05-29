import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
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

  @Column({default: TaskStatus.OPEN})
  status: TaskStatus = TaskStatus.OPEN;

  @Column({default: TaskPriority.LOW})
  priority: TaskPriority = TaskPriority.LOW;

  @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date = new Date();

  @Column('date')
  dueDate?: Date;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  assignedUser?: User;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  createdBy?: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Project;
}
