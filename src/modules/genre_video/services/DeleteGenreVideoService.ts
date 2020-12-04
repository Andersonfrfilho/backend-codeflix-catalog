import { injectable, inject } from 'tsyringe';
import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import AppError from '@shared/errors/AppError';
import IGenreVideoRepository from '@modules/genre_video/repositories/IGenreVideoRepository';

@injectable()
class DeleteGenreVideoService {
  constructor(
    @inject('GenreVideosRepository')
    private genre_videoRepository: IGenreVideoRepository,
  ) {}

  public async execute({
    id,
  }: {
    id: string;
  }): Promise<GenreVideo | undefined> {
    const cast_member = await this.genre_videoRepository.findById({ id });
    if (!cast_member) {
      throw new AppError('This cast member is already exist');
    }
    await this.genre_videoRepository.delete({ id });
    return cast_member;
  }
}
export default DeleteGenreVideoService;
