import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import ICreateGenreDTO from '@modules/genres/dtos/ICreateGenreDTO';
import IUpdateGenreDTO from '@modules/genres/dtos/IUpdateGenreDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import IListUsersDTO from '@modules/genres/dtos/IListGenresDTO';

export default interface IGenresRepository {
  create(data: ICreateGenreDTO): Promise<Genre>;
  delete({ id }: { id: string }): Promise<Genre | undefined>;
  update(data: IUpdateGenreDTO): Promise<Genre | undefined>;
  list(data: IPaginationDTO): Promise<IListUsersDTO>;
  findGenreById({ id }: { id: string }): Promise<Genre | undefined>;
}
