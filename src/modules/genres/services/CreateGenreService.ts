import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';

interface IRequest {
  name: string;
  is_active: boolean;
}
@injectable()
class CreateGenreService {
  constructor(
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute({ is_active, name }: IRequest): Promise<Genre> {
    const category = await this.genresRepository.create({
      is_active,
      name,
    });
    return category;
  }
}
export default CreateGenreService;
