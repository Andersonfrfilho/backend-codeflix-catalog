import { getRepository, Raw, Repository } from 'typeorm';
import Video from '@modules/videos/infra/typeorm/entities/Video';
import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import ICreateVideoDTO from '@modules/videos/dtos/ICreateVideoDTO';
import IUpdateVideoDTO from '@modules/videos/dtos/IUpdateVideoDTO';
import AppError from '@shared/errors/AppError';
import IPagination, { EOrder } from '@shared/dtos/IPaginatedDTO';
import IListVideosDTO from '@modules/videos/dtos/IListVideosDTO';

class VideosRepository implements IVideosRepository {
  private ormRepository: Repository<Video>;

  constructor() {
    this.ormRepository = getRepository(Video);
  }

  public async findVideoById({
    id,
  }: {
    id: string;
  }): Promise<Video | undefined> {
    const findVideo = await this.ormRepository.findOne({
      where: { id },
    });
    return findVideo;
  }

  public async list({
    keyword,
    order,
    skip,
    take,
  }: IPagination): Promise<IListVideosDTO> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        title: Raw(category => `${category} ILIKE '%${keyword}%'`),
      },
      order: { title: order ? EOrder.DESC : EOrder.ASC },
      take,
      skip,
      relations: ['categories', 'genres'],
    });
    return {
      total,
      videos: result,
    };
  }

  public async create({
    name,
    title,
    description,
    year_launched,
    opened,
    rating,
    duration,
  }: ICreateVideoDTO): Promise<Video> {
    const video = this.ormRepository.create({
      name,
      title,
      description,
      year_launched,
      opened,
      rating,
      duration,
    });
    await this.ormRepository.save(video);
    return video;
  }

  public async update({
    id,
    name,
    title,
    description,
    year_launched,
    opened,
    rating,
    duration,
  }: IUpdateVideoDTO): Promise<Video | undefined> {
    const findVideo = await this.ormRepository.findOne({
      where: { id },
    });
    if (!findVideo) {
      throw new AppError('Video dont exist', 400);
    }

    await this.ormRepository.save({
      ...findVideo,
      name,
      title,
      description,
      year_launched,
      opened,
      rating,
      duration,
    });
    return {
      ...findVideo,
      name,
      title,
      description,
      year_launched,
      opened,
      rating,
      duration,
    };
  }

  public async delete({ id }: { id: string }): Promise<Video | undefined> {
    const findVideo = await this.ormRepository.findOne({
      where: { id },
    });
    if (!findVideo) {
      throw new AppError('Video dont exist', 400);
    }
    await this.ormRepository.remove(findVideo);
    return findVideo;
  }
}
export default VideosRepository;
