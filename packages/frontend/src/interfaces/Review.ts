export default interface IReview {
  id: number;
  userId: number;
  movieId: number;
  movieName: string;
  rating: number;
  opinion: string;
  createdAt: string;
  updatedAt: string;
}
