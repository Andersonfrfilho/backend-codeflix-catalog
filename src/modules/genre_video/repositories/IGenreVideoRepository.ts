import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import ICreateGenreVideoDTO from '@modules/genre_video/dtos/ICreateGenreVideoDTO';
import IPagination from '@shared/dtos/IPaginatedDTO';
import IListGenreVideosDTO from '@modules/genre_video/dtos/IListGenreVideoDTO';
import IUpdateGenreVideoDTO from '@modules/genre_video/dtos/IUpdatedGenreVideoDTO';

export default interface IGenreVideosRepository {
  findById({ id }: { id: string }): Promise<GenreVideo | undefined>;
  findRelationship(data: ICreateGenreVideoDTO): Promise<GenreVideo | undefined>;
  create(data: ICreateGenreVideoDTO): Promise<GenreVideo>;
  list(data: IPagination): Promise<IListGenreVideosDTO>;
  update(data: IUpdateGenreVideoDTO): Promise<GenreVideo | undefined>;
  delete({ id }: { id: string }): Promise<GenreVideo | undefined>;
}
