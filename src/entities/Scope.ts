import { IsBoolean, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsUnique } from "../lib/validations";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Scope extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsUnique()
  ref: string;

  @Column()
  @IsBoolean()
  dyn: boolean = true;

  @ManyToMany(type => User, user => user.scopes)
  @JoinTable({ name: "user_scope" })
  users: User[];
}
