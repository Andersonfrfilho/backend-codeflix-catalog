import { injectable, inject } from 'tsyringe';
import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import AppError from '@shared/errors/AppError';
import IGenreVideoRepository from '@modules/genre_video/repositories/IGenreVideoRepository';

interface IRequest {
  id: string;
}
@injectable()
class FindGenreVideoService {
  constructor(
    @inject('GenreVideoRepository')
    private genre_videoRepository: IGenreVideoRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<GenreVideo | undefined> {
    const postExist = await this.genre_videoRepository.findById({ id });

    if (!postExist) {
      throw new AppError('This post is not exist');
    }
    return postExist;
  }
}
export default FindGenreVideoService;
