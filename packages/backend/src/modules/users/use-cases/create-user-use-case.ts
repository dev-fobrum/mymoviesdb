import bcrypt from "bcryptjs";

import { CreateUserDto } from "../dtos/createUser.dto";
import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { UserRepository } from "../repositories/UserRepository";

export class CreateUserUseCase {
  private userRepository: IUserRepository = new UserRepository();

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async execute(body: CreateUserDto): Promise<IUser> {
    const findUser = await this.userRepository.findByEmail(body.email);

    if (findUser) {
      throw new Error(
        `User cannot be created: ${body.email} already in database`
      );
    }

    return this.userRepository.create({
      ...body,
      password: await this.hashPassword(body.password),
    });
  }
}
