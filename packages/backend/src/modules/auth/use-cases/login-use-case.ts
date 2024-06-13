import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserEntity from "../entities/User.entity";

import { IUser } from "../interfaces/User.interface";
import { IAuthRepository } from "../interfaces/AuthRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

import { LoginDto } from "../dtos/login.dto";

export class LoginUseCase {
  private userRepository: IAuthRepository = new UserRepository();

  async comparePassword(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }

  generateToken(user: UserEntity) {
    const secretKey: string = process.env.SECRET_KEY || "";

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "4h" });

    return token;
  }

  async execute(body: LoginDto): Promise<any> {
    try {
      const { username, password } = body;
      const user = await this.userRepository.findUser(username);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const validPassword = await this.comparePassword(password, user.password);

      if (!validPassword) {
        throw new Error("Senha inválida");
      }

      const token = this.generateToken(user);

      return {
        userId: user.id,
        name: user.name,
        lastName: user.lastname,
        token,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
