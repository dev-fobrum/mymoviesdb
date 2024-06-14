import bcrypt from "bcryptjs";

import { UpdateUserDto } from "../dtos/updateUser.dto";
import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

export class UpdateUserUseCase {
  private userRepository: IUserRepository = new UserRepository();

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async execute(
    body: UpdateUserDto,
    userId: number | undefined
  ): Promise<IUser> {
    if (!userId || !body?.email) {
      throw new Error("ID ou e-mail de usuário não fornecido");
    }

    const findUser = await this.userRepository.findByEmail(body?.email);

    if (!findUser) {
      throw new Error(`Usuário não encontrado`);
    }

    delete body.email;

    return this.userRepository.update(
      {
        ...body,
        ...(body?.password && {
          password: await this.hashPassword(body.password),
        }),
      },
      userId
    );
  }
}
