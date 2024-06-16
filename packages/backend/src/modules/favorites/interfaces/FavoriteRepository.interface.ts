import CreateFavoriteDto from "../dtos/CreateFavorite.dto";
import FindAllDto from "../dtos/FindAll.dto";
import FavoriteEntity from "../entities/Favorite.entity";

export interface IFavoriteRepository {
  findAll(
    query: FindAllDto
  ): Promise<{ data: FavoriteEntity[]; count: number }>;
  findOne(movieId: number, userId: number): Promise<FavoriteEntity | null>;
  create(body: CreateFavoriteDto, userId: number): Promise<FavoriteEntity>;
  remove(movieId: number, userId: number): Promise<number>;
}
