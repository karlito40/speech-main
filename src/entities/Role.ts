import { IsString, IsNumber } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsUnique } from "../validations";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsUnique(Role)
  ref: string;

  @Column()
  @IsNumber()
  level: boolean = true;

  @ManyToMany(type => User, user => user.roles)
  @JoinTable({ name: "user_role" })
  users: User[];
}
