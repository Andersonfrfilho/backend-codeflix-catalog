import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';

interface IRequest {
  id: string;
}
@injectable()
class DeleteGenreService {
  constructor(
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Genre | undefined> {
    const category = await this.genresRepository.delete({ id });
    if (!category) {
      throw new AppError('image not found', 400);
    }
    return category;
  }
}
export default DeleteGenreService;
