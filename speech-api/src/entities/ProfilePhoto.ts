import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class ProfilePhoto extends BaseEntity {

  fillable = ["src"];
  hidden = ["profile"];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  url: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(type => Profile, profile => profile.photos, {
    cascade: true
  })
  profile: Profile;

}
