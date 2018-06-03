import { IsString, IsNumber, MaxLength, MinLength, IsIn } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { IsUnique } from "../lib/validations";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";


@Entity()
export class Profile extends BaseEntity {

  fillable = ["pseudo", "gender", "headline", "content", "user"];
  hidden = ["user"];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(3)
  @IsUnique()
  pseudo: string;

  @Column()
  @IsIn(["M", "F"])
  gender: string;

  @Column()
  @IsString()
  @MaxLength(255)
  headline: string;

  @Column()
  @IsString()
  @MaxLength(2000)
  content: string;

  // photos

  @OneToOne(type => User, user => user.profile)
  @JoinColumn()
  user: User;
}
