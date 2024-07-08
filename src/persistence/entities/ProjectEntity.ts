import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import type {Relation} from "typeorm";
import {User} from "./UserEntity";
import {Task} from "./TaskEntity";

@Entity({name: "projects"})
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("timestamp", {default: () => "CURRENT_TIMESTAMP"})
  createdDate: Date = new Date();

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: "SET NULL",
  })
  createdByUser?: Relation<User>;

  @OneToMany(() => Task, (task) => task.project)
  tasks?: Relation<Task>[];

  @ManyToMany(() => User)
  @JoinTable()
  members?: Relation<User>[];
}
