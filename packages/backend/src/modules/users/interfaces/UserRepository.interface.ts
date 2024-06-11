import UserEntity from "../entities/User.entity";

import { CreateUserDto } from "../dtos/createUser.dto";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(body: CreateUserDto): Promise<UserEntity>;
}
