import UserEntity from "../entities/User.entity";

export interface IAuthRepository {
  findUser(username: string): Promise<UserEntity | null>;
}
