import { IsString, IsNumber } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from "typeorm";
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

  @OneToMany(type => User, user => user.role)
  users: User[];
}
