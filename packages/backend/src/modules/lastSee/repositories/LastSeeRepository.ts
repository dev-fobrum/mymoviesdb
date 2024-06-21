import LastSeeEntity from "../entities/LastSee.entity";

import { ILastSeeRepository } from "../interfaces/LastSeeRepository.interface";

import LastSee from "../entities/LastSee.entity";

export class LastSeeRepository implements ILastSeeRepository {
  async findAll(userId: number): Promise<LastSeeEntity[]> {
    const lastSee = await LastSeeEntity.findAll({
      where: {
        userId,
      },
      attributes: ["userId", "movieId"],
      raw: true,
      group: ["userId", "movieId"],
    });

    return lastSee.reverse();
  }

  async findOne(
    movieId: number,
    userId: number
  ): Promise<LastSeeEntity | null> {
    const lastSee = await LastSeeEntity.findOne({
      where: {
        movieId,
        userId,
      },
    });

    return lastSee;
  }

  async create(movieId: number, userId: number): Promise<LastSee> {
    const created = await LastSeeEntity.create({
      movieId,
      userId,
      created_at: new Date(),
    });

    return created;
  }

  async remove(movieId: number, userId: number): Promise<number> {
    const removed = await LastSeeEntity.destroy({
      where: {
        movieId,
        userId,
      },
    });

    return removed;
  }
}
