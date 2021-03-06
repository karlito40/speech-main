import { IsString, IsNumber } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { IsUnique } from "../lib/validations";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsUnique()
  ref: string;

  @Column()
  @IsNumber()
  level: number;

  @OneToMany(type => User, user => user.role)
  users: User[];
}
