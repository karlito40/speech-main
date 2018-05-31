import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("scopes")
export class Scope {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ref: string;

  @Column()
  dyn: boolean;
}
