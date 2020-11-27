import Genre from '@modules/genres/infra/typeorm/entities/Genre';

export default interface IListGenresServiceDTO {
  genres: Genre[];
  total: number;
}
