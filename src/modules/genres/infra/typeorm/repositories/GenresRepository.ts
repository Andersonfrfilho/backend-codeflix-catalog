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

  public async findById({ id }: { id: string }): Promise<Genre | undefined> {
    const find_genre = await this.ormRepository.findOne({
      where: { id },
    });
    return find_genre;
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
      relations: ['videos'],
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
    const find_genre = await this.ormRepository.findOne({
      where: { id },
    });
    if (!find_genre) {
      throw new AppError('Genre dont exist', 400);
    }

    await this.ormRepository.save({ ...find_genre, name });
    return { ...find_genre, name };
  }

  public async delete({ id }: { id: string }): Promise<Genre | undefined> {
    const find_genre = await this.ormRepository.findOne({
      where: { id },
    });
    if (!find_genre) {
      throw new AppError('Genre dont exist', 400);
    }
    await this.ormRepository.remove(find_genre);
    return find_genre;
  }

  public async findByName({
    name,
  }: {
    name: string;
  }): Promise<Genre | undefined> {
    const find_genre = await this.ormRepository.findOne({ where: { name } });
    return find_genre;
  }
}
export default GenresRepository;
