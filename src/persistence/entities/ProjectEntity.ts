import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
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

  @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
  createdDate: Date = new Date();

  @OneToMany(() => Task, (task) => task.project, {
    onDelete: 'CASCADE',
  })
  tasks?: Task[];

  @ManyToOne(() => User, (user) => user.createdTasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  createdBy?: User;

  @ManyToMany(() => User)
  @JoinTable()
  members?: User[];
}
