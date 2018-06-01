import { IsBoolean, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IsUnique } from "../validations";

@Entity()
export class Scope {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsUnique(Scope)
  ref: string;

  @Column()
  @IsBoolean()
  dyn: boolean = true;

  @ManyToMany(type => User, user => user.scopes)
  @JoinTable({ name: "user_scope" })
  users: Promise<User[]>;
}
