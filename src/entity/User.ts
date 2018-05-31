import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import bcrypt from "bcrypt";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(3)
  pseudo: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  scopes: string;

  getScopes(): Array<string> {
    return this.scopes ? this.scopes.split(",") : [];
  }

  hasScope(scopesRef: Array<string>) {
    return this.getScopes()
      .some(scope => scopesRef.includes(scope));
  }

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt) as string;
    return this.password;
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toJSON() {
    const o = Object.assign({}, this);
    delete o.password;
    return o;
  }

}

