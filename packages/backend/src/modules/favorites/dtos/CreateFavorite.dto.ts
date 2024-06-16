export default interface CreateFavoriteDto {
  movieId: number;
  name: string;
  releaseDate: Date | string;
  popularity: number;
}
