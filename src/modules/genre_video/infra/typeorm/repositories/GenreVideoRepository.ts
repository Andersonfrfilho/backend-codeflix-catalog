import { getRepository, Raw, Repository } from 'typeorm';
import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import ICreateGenreVideoDTO from '@modules/genre_video/dtos/ICreateGenreVideoDTO';
import IGenreVideosRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import IPaginate, { EOrder } from '@shared/dtos/IPaginatedDTO';
import IListGenreVideosDTO from '@modules/genre_video/dtos/IListGenreVideoDTO';
import AppError from '@shared/errors/AppError';

class GenreVideosRepository implements IGenreVideosRepository {
  private ormRepository: Repository<GenreVideo>;

  constructor() {
    this.ormRepository = getRepository(GenreVideo);
  }

  public async findById({
    id,
  }: {
    id: string;
  }): Promise<GenreVideo | undefined> {
    const genre_video = await this.ormRepository.findOne(id);
    return genre_video;
  }

  public async create(
    genre_videoData: ICreateGenreVideoDTO,
  ): Promise<GenreVideo> {
    const genre_video = this.ormRepository.create(genre_videoData);
    await this.ormRepository.save(genre_video);
    return genre_video;
  }

  public async save(genre_video: GenreVideo): Promise<GenreVideo> {
    return this.ormRepository.save(genre_video);
  }

  public async list({
    take,
    skip,
    keyword,
    order,
  }: IPaginate): Promise<IListGenreVideosDTO> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        name: Raw(genre_video => `${genre_video} ILIKE '%${keyword}%'`),
      },
      order: { created_at: order ? EOrder.DESC : EOrder.ASC },
      take,
      skip,
    });
    return { total, genres_videos: result };
  }

  public async update(
    genre_videoData: Partial<GenreVideo>,
  ): Promise<GenreVideo | undefined> {
    const genre_videoExist = await this.ormRepository.findOne({
      where: { id: genre_videoData.id },
    });
    const genre_video = await this.ormRepository.save({
      ...genre_videoExist,
      ...genre_videoData,
    });
    return genre_video;
  }

  public async delete({ id }: { id: string }): Promise<GenreVideo | undefined> {
    const genre_videoExist = await this.ormRepository.findOneOrFail({
      where: { id },
    });
    await this.ormRepository.delete({ id });
    return genre_videoExist;
  }

  public async findRelationship({
    genre_id,
    video_id,
  }: ICreateGenreVideoDTO): Promise<GenreVideo | undefined> {
    const genre_videoExist = await this.ormRepository.findOne({
      where: { genre_id, video_id },
    });
    return genre_videoExist;
  }
}
export default GenreVideosRepository;
