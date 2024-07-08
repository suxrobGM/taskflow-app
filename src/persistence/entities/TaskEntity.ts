import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import type {Relation} from "typeorm";
import {TaskPriority, TaskStatus} from "../enums";
import {User} from "./UserEntity";
import {Project} from "./ProjectEntity";

@Entity({name: "tasks"})
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({type: "enum", enum: TaskStatus, default: TaskStatus.OPEN})
  status: TaskStatus = TaskStatus.OPEN;

  @Column({type: "enum", enum: TaskPriority, default: TaskPriority.LOW})
  priority: TaskPriority = TaskPriority.LOW;

  @Column("timestamp", {default: () => "CURRENT_TIMESTAMP"})
  createdDate: Date = new Date();

  @Column("timestamp")
  dueDate?: Date;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: "SET NULL",
  })
  assignedUser?: Relation<User>;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    nullable: false,
    onDelete: "SET NULL",
  })
  createdByUser?: Relation<User>;

  @ManyToOne(() => Project, (project) => project.tasks)
  project?: Relation<Project>;
}
