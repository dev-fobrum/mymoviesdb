import UserEntity from "../entities/User.entity";

import { IUser } from "../interfaces/User.interface";
import { IUserRepository } from "../interfaces/UserRepository.interface";

import { CreateUserDto } from "../dtos/createUser.dto";

const users: IUser[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserEntity[]> {
    const users = await UserEntity.findAll();

    return users;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create(body: CreateUserDto): Promise<UserEntity> {
    const created = UserEntity.create({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return created;
  }
}
