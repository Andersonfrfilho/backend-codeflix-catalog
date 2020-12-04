import Video from '@modules/videos/infra/typeorm/entities/Video';
import ICreateVideoDTO from '@modules/videos/dtos/ICreateVideoDTO';
import IUpdateVideoDTO from '@modules/videos/dtos/IUpdateVideoDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import IListUsersDTO from '@modules/videos/dtos/IListVideosDTO';

export default interface IVideosRepository {
  create(data: ICreateVideoDTO): Promise<Video>;
  delete({ id }: { id: string }): Promise<Video | undefined>;
  update(data: IUpdateVideoDTO): Promise<Video | undefined>;
  list(data: IPaginationDTO): Promise<IListUsersDTO>;
  findVideoById({ id }: { id: string }): Promise<Video | undefined>;
}
