import bcrypt from "bcryptjs";

import { CreateUserDto } from "../dtos/createUser.dto";
import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

import { enviarEmailBoasVindas } from "../../../mailer/mailer";
import { create } from "domain";

export class CreateUserUseCase {
  private userRepository: IUserRepository = new UserRepository();

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async execute(body: CreateUserDto): Promise<IUser> {
    const findUser = await this.userRepository.findByUniqConstraint(
      body.email,
      parseInt(body.cpf)
    );

    if (findUser) {
      throw new Error(`Erro: usuário já cadastrado`);
    }

    const created = await this.userRepository.create({
      ...body,
      password: await this.hashPassword(body.password),
    });

    try {
      await enviarEmailBoasVindas(body.email);
    } catch (error) {
      console.error("Erro ao enviar email de boas-vindas:", error);
    } finally {
      return created;
    }
  }
}
