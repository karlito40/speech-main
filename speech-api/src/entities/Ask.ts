import { IsString } from "class-validator";
import { Column, JoinColumn, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Ask extends BaseEntity {

  fillable = ["accepted", "from", "to"];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accepted: boolean;

  @ManyToOne(type => Profile, profile => profile.askFor, {
    cascade: true
  })
  @JoinColumn({ name: "fromProfileId" })
  from: Profile;

  @ManyToOne(type => Profile, profile => profile.askReceived, {
    cascade: true
  })
  @JoinColumn({ name: "toProfileId" })
  to: Profile;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
