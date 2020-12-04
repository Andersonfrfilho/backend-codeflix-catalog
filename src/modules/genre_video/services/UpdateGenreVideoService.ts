import { injectable, inject } from 'tsyringe';
import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import AppError from '@shared/errors/AppError';
import IGenreVideosRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import IUpdateGenreVideoDTO from '@modules/genre_video/dtos/IUpdatedGenreVideoDTO';

@injectable()
class UpdateGenreVideoService {
  constructor(
    @inject('GenreVideosRepository')
    private genre_videoRepository: IGenreVideosRepository,
  ) {}

  public async execute({
    id,
    genre_id,
    video_id,
  }: IUpdateGenreVideoDTO): Promise<GenreVideo | undefined> {
    const genre_video_exist = await this.genre_videoRepository.findById({ id });
    if (!genre_video_exist) {
      throw new AppError(
        'Only authenticated genre_video_exist change avatar',
        401,
      );
    }

    const genre_video = await this.genre_videoRepository.update({
      ...genre_video_exist,
      genre_id,
      video_id,
    });
    return genre_video;
  }
}
export default UpdateGenreVideoService;
