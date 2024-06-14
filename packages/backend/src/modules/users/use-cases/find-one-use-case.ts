import UserEntity from "../entities/User.entity";

import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

export class FindOneUseCase {
  private userRepository: IUserRepository = new UserRepository();

  async execute(userId: number | undefined): Promise<UserEntity | null> {
    if (!userId) {
      throw new Error("ID de usuário não fornecido");
    }

    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
