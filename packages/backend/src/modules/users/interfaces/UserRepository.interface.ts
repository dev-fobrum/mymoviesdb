import UserEntity from "../entities/User.entity";

import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findOne(userId: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUniqConstraint(email: string, cpf: number): Promise<UserEntity | null>;
  create(body: CreateUserDto): Promise<UserEntity>;
  update(body: UpdateUserDto, userId: number): Promise<UserEntity>;
}
