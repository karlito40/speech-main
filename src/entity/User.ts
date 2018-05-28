import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  pseudo: string;

  @Column()
  password: string;

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
