import { CreateUserDto } from "../dtos/createUser.dto";
import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

export class CreateUserUseCase {
  private userRepository: IUserRepository = new UserRepository();

  async execute(body: CreateUserDto): Promise<IUser> {
    console.warn("TESTE", body);
    const findUser = await this.userRepository.findByEmail(body.email);

    if (findUser) {
      throw new Error(
        `User cannot be created: ${body.email} already in database`
      );
    }

    return this.userRepository.create(body);
  }
}
