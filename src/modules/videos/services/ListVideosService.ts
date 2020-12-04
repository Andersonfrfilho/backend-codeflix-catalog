import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import IPagination from '@shared/dtos/IPaginatedDTO';
import IListVideosDTO from '@modules/videos/dtos/IListVideosDTO';

@injectable()
class ListVideosService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  public async execute(data: IPagination): Promise<IListVideosDTO> {
    const videos = await this.videosRepository.list(data);

    return videos;
  }
}
export default ListVideosService;
