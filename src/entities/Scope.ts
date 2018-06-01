import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { IsString, IsBoolean } from "class-validator";
import { User } from "./User";

@Entity()
export class Scope {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  ref: string;

  @Column()
  @IsBoolean()
  dyn: boolean = true;

  @ManyToMany(type => User, user => user.scopes)
  @JoinTable({ name: "user_scope" })
  users: Promise<User[]>;
}
