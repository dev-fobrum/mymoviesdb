import { IAuthRepository } from "../interfaces/AuthRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

import { ForgotPasswordDto } from "../dtos/forgot-password.dto";

export class RecoverPasswordUseCase {
  private userRepository: IAuthRepository = new UserRepository();

  async execute(body: ForgotPasswordDto): Promise<any> {
    const { username } = body;
    const user = await this.userRepository.findUser(username);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return "ok";
  }
}
