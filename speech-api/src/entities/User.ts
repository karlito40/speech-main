import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { IsString, IsEmail, MinLength } from "class-validator";
import { Scope } from "./Scope";
import bcrypt from "bcrypt";
import { IsUnique } from "../lib/validations";
import { BaseEntity } from "./BaseEntity";
import { Role } from "./Role";
import { Profile } from "./Profile";
import jwt from "jsonwebtoken";
import * as notify from "../lib/notifier";

@Entity()
export class User extends BaseEntity {

  static givenScopes = ["show-profiles"];

  fillable = ["email", "password"];
  hidden = ["password", "createdAt", "updatedAt"];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @IsUnique()
  email: string;

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

  @OneToOne(type => Profile, profile => profile.user)
  profile: Profile;

  hasScope(scopeToHave: string[]) {
    if (!this.scopes) {
      throw new Error("User::scopes not loaded through relations");
    }
    return this.scopes.some(scope => scopeToHave.includes(scope.ref));
  }

  hasRole(roleToHave: string[]) {
    return this.role && roleToHave.includes(this.role.ref);
  }

  createToken() {
    const options = !this.hasRole(["super-admin"]) ? { expiresIn: "30d" } : null;
    return jwt.sign(this.toJSON(), process.env.JWT_SECRET_KEY, options);
  }

  notify(...args) {
    return notify.user.apply(null, [this].concat(args));
  }

  isAdmin() {
    return this.hasRole(["super-admin"]);
  }

  setEmail(email) {
    this.email = email.toLowerCase();
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
