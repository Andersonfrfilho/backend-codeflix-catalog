import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';

export default interface IListGenresVideosServiceReturn {
  genres_videos: GenreVideo[];
  total: number;
}
