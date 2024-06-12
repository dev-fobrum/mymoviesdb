import UserEntity from "../entities/User.entity";

import { IUser } from "../interfaces/User.interface";
import { IAuthRepository } from "../interfaces/AuthRepository.interface";

import { LoginDto } from "../dtos/login.dto";

export class UserRepository implements IAuthRepository {
  async findUser(username: string): Promise<UserEntity | null> {
    const user = await UserEntity.findOne({
      where: {
        email: username,
      },
    });

    return user;
  }
}
