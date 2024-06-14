import UserEntity from "../entities/User.entity";
import { Op } from "sequelize";

import { IUserRepository } from "../interfaces/UserRepository.interface";

import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserEntity[]> {
    const users = await UserEntity.findAll();

    return users;
  }

  async findOne(userId: number): Promise<UserEntity | null> {
    const allAttributes = Object.keys(UserEntity.getAttributes());

    const user = await UserEntity.findByPk(userId, {
      attributes: allAttributes.filter((attribute) => attribute !== "password"),
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findByUniqConstraint(
    email: string,
    cpf: number
  ): Promise<UserEntity | null> {
    const user = await UserEntity.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }],
      },
    });

    return user;
  }

  async create(body: CreateUserDto): Promise<UserEntity> {
    const created = await UserEntity.create({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return created;
  }

  async update(body: UpdateUserDto, userId: number): Promise<any> {
    const update = await UserEntity.update(
      {
        ...body,
        updated_at: new Date(),
      },
      {
        where: {
          id: userId,
        },
      }
    );

    return update;
  }
}
