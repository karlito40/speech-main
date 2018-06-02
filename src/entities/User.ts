import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { IsString, IsEmail, MinLength } from "class-validator";
import { Scope } from "./Scope";
import bcrypt from "bcrypt";
import { IsUnique } from "../validations";
import { BaseEntity } from "./BaseEntity";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity {

  fillable = ["email", "pseudo", "password"];
  hidden = ["password", "createdAt", "updatedAt"];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @IsUnique(User)
  email: string;

  @Column()
  @MinLength(3)
  @IsUnique(User)
  pseudo: string;

  @Column()
  @MinLength(6)
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToMany(type => Scope, scope => scope.users, {
    cascade: true
  })
  @JoinTable({ name: "user_scope" })
  scopes: Scope[];

  @ManyToOne(type => Role, role => role.users, {
    cascade: true
  })
  role: Role;

  hasScope(scopeToHave: string[]) {
    if (!this.scopes) {
      throw new Error("User::scopes not loaded through relations");
    }
    return this.scopes.some(scope => scopeToHave.includes(scope.ref));
  }

  hasRole(roleToHave: string[]) {
    return this.role && roleToHave.includes(this.role.ref);
  }

  async setAsyncPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt) as string;
    return this.password;
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
