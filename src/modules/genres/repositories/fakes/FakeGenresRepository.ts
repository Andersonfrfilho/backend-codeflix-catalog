import { v4 as uuidv4 } from 'uuid';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import ICreateGenreDTO from '@modules/genres/dtos/ICreateGenreDTO';
import IUpdateGenreDTO from '@modules/genres/dtos/IUpdateGenreDTO';
import AppError from '@shared/errors/AppError';
import IListUsersDTO from '@modules/genres/dtos/IListGenresDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import Fakes from '@shared/utils';

class FakerGenresRepository implements IGenresRepository {
  private genres: Genre[] = [];

  public async create({ name }: ICreateGenreDTO): Promise<Genre> {
    const genre = new Genre();
    const date = new Date();
    Object.assign(genre, {
      id: uuidv4(),
      name,
      created_at: date,
      updated_at: date,
    });
    this.genres.push(genre);
    return genre;
  }

  public async list({
    keyword = '',
    order = true,
    take = 0,
    skip = 5,
  }: IPaginationDTO): Promise<IListUsersDTO> {
    const fakePagination = new Fakes.FindAndCount({
      array: this.genres,
      keyword,
      order,
      property: 'name',
      skip,
      take,
    });
    const genres = fakePagination.findAndCount();

    return {
      total: genres.length,
      genres,
    };
  }

  public async delete({ id }: { id: string }): Promise<Genre | undefined> {
    const indexListGenres = this.genres.findIndex(genre => {
      return genre.id === id;
    });
    const genreDelete = this.genres[indexListGenres];
    delete this.genres[indexListGenres];
    return genreDelete;
  }

  public async findGenreById({
    id,
  }: {
    id: string;
  }): Promise<Genre | undefined> {
    const findGenre = this.genres.find(genre => {
      return genre.id === id;
    });
    return findGenre;
  }

  public async update({
    id,
    name,
  }: IUpdateGenreDTO): Promise<Genre | undefined> {
    const findGenre = this.genres.map(genre => {
      if (genre.id === id) {
        return { ...genre, name };
      }
      return genre;
    });
    if (!findGenre) {
      throw new AppError('Genre dont exist', 400);
    }
    this.genres = [...findGenre];
    const genre = this.genres.find(genre => genre.id === id);
    return genre;
  }
}
export default FakerGenresRepository;
