import { IsString, IsNumber, MaxLength, IsIn } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";


@Entity()
export class Profile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

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
  user: User;
}
