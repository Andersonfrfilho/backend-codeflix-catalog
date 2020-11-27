import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';

interface IRequest {
  id: string;
  name: string;
  is_active: boolean;
}
@injectable()
class UpdateImageService {
  constructor(
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({
    id,
    name,
    is_active,
  }: IRequest): Promise<Genre | undefined> {
    const category_changed = await this.genresRepository.findGenreById({
      id,
    });
    if (!category_changed) {
      throw new AppError('image does not exist', 400);
    }

    const category = await this.genresRepository.update({
      id,
      name,
      is_active,
    });

    return category;
  }
}
export default UpdateImageService;
