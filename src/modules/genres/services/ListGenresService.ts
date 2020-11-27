import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import IPagination from '@shared/dtos/IPaginatedDTO';
import IListGenresDTO from '@modules/genres/dtos/IListGenresDTO';

@injectable()
class ListGenresService {
  constructor(
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
  ) {}

  public async execute(data: IPagination): Promise<IListGenresDTO> {
    const genres = await this.genresRepository.list(data);

    return genres;
  }
}
export default ListGenresService;
