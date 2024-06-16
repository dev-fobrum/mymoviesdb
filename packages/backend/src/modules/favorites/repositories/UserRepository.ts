import FavoriteEntity from "../entities/Favorite.entity";

import { IFavoriteRepository } from "../interfaces/FavoriteRepository.interface";

import Favorite from "../entities/Favorite.entity";

import FindAllDto from "../dtos/FindAll.dto";
import CreateFavoriteDto from "../dtos/CreateFavorite.dto";
import { Op } from "sequelize";
import { fromToSequelizeOrder } from "../../../utils/FromToOrdering";

export class FavoriteRepository implements IFavoriteRepository {
  async findAll(
    query: FindAllDto
  ): Promise<{ data: FavoriteEntity[]; count: number }> {
    const orderOpts = fromToSequelizeOrder(query?.ordering);

    const count = await FavoriteEntity.count({
      where: {
        ...(query.query && {
          name: { [Op.like]: `%${query.query}%` },
        }),
      },
    });

    const favorites = await FavoriteEntity.findAll({
      where: {
        ...(query.query && {
          name: { [Op.like]: `%${query.query}%` },
        }),
      },
      order: [[orderOpts.column, orderOpts.order]],
      offset: (query.page - 1) * 20,
      limit: 20,
    });

    return { data: favorites, count };
  }

  async findOne(
    movieId: number,
    userId: number
  ): Promise<FavoriteEntity | null> {
    const favorite = await FavoriteEntity.findOne({
      where: {
        movieId,
        userId,
      },
    });

    return favorite;
  }

  async create(body: CreateFavoriteDto, userId: number): Promise<Favorite> {
    const created = await FavoriteEntity.create({
      ...body,
      userId,
      created_at: new Date(),
    });

    return created;
  }

  async remove(movieId: number, userId: number): Promise<number> {
    const removed = await FavoriteEntity.destroy({
      where: {
        movieId,
        userId,
      },
    });

    return removed;
  }
}
