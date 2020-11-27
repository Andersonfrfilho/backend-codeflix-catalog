import { getRepository, Raw, Repository } from 'typeorm';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import ICreateGenreDTO from '@modules/genres/dtos/ICreateGenreDTO';
import IUpdateGenreDTO from '@modules/genres/dtos/IUpdateGenreDTO';
import AppError from '@shared/errors/AppError';
import IPagination, { EOrder } from '@shared/dtos/IPaginatedDTO';
import IListGenresDTO from '@modules/genres/dtos/IListGenresDTO';

class GenresRepository implements IGenresRepository {
  private ormRepository: Repository<Genre>;

  constructor() {
    this.ormRepository = getRepository(Genre);
  }

  public async findGenreById({
    id,
  }: {
    id: string;
  }): Promise<Genre | undefined> {
    const findGenre = await this.ormRepository.findOne({
      where: { id },
    });
    return findGenre;
  }

  public async list({
    keyword,
    order,
    skip,
    take,
  }: IPagination): Promise<IListGenresDTO> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        name: Raw(category => `${category} ILIKE '%${keyword}%'`),
      },
      order: { name: order ? EOrder.DESC : EOrder.ASC },
      take,
      skip,
    });
    return {
      total,
      genres: result,
    };
  }

  public async create({ name, is_active }: ICreateGenreDTO): Promise<Genre> {
    const category = this.ormRepository.create({
      name,
      is_active,
    });
    await this.ormRepository.save(category);
    return category;
  }

  public async update({
    id,
    name,
  }: IUpdateGenreDTO): Promise<Genre | undefined> {
    const findGenre = await this.ormRepository.findOne({
      where: { id },
    });
    if (!findGenre) {
      throw new AppError('Genre dont exist', 400);
    }

    await this.ormRepository.save({ ...findGenre, name });
    return { ...findGenre, name };
  }

  public async delete({ id }: { id: string }): Promise<Genre | undefined> {
    const findGenre = await this.ormRepository.findOne({
      where: { id },
    });
    if (!findGenre) {
      throw new AppError('Genre dont exist', 400);
    }
    await this.ormRepository.remove(findGenre);
    return findGenre;
  }
}
export default GenresRepository;
