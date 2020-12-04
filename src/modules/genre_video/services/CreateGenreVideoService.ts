import { injectable, inject } from 'tsyringe';
import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import AppError from '@shared/errors/AppError';
import IGenreVideosRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import ICreateGenreVideoDTO from '@modules/genre_video/dtos/ICreateGenreVideoDTO';
import GenresRepository from '@modules/genres/infra/typeorm/repositories/GenresRepository';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';

@injectable()
class CreateVideoService {
  constructor(
    @inject('GenresRepository')
    private genresRepository: GenresRepository,
    @inject('VideosRepository')
    private videosRepository: VideosRepository,
    @inject('GenreVideoRepository')
    private genreVideoRepository: IGenreVideosRepository,
  ) {}

  public async execute({
    genre_id,
    video_id,
  }: ICreateGenreVideoDTO): Promise<GenreVideo> {
    const genre_exist = await this.genresRepository.findGenreById({
      id: genre_id,
    });
    if (!genre_exist) {
      throw new AppError('genre not exist', 400);
    }
    const video_exist = await this.videosRepository.findVideoById({
      id: video_id,
    });
    if (!video_exist) {
      throw new AppError('video not exist', 400);
    }
    const video_genre_exist = await this.genreVideoRepository.findRelationship({
      genre_id,
      video_id,
    });
    if (video_genre_exist) {
      throw new AppError('relationship already exists', 400);
    }
    const cast_member = await this.genreVideoRepository.create({
      genre_id: genre_exist.id,
      video_id: video_exist.id,
    });

    return cast_member;
  }
}
export default CreateVideoService;
