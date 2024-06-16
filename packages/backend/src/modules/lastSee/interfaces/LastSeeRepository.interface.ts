import LastSeeEntity from "../entities/LastSee.entity";

export interface ILastSeeRepository {
  findAll(): Promise<LastSeeEntity[]>;
  findOne(movieId: number, userId: number): Promise<LastSeeEntity | null>;
  create(movieId: number, userId: number): Promise<LastSeeEntity>;
  remove(movieId: number, userId: number): Promise<number>;
}
