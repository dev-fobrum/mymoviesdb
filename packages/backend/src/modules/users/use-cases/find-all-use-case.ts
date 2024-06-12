import UserEntity from "../entities/User.entity";

import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

export class FindAllUseCase {
  private userRepository: IUserRepository = new UserRepository();

  async execute(): Promise<IUser[]> {
    const users = await UserEntity.findAll();
    return users;
  }
}
