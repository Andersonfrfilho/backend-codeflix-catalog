import { v4 as uuidv4 } from 'uuid';
import GenreVideo from '@modules/genre_video/infra/typeorm/entities/GenreVideo';
import ICreateGenreVideoDTO from '@modules/genre_video/dtos/ICreateGenreVideoDTO';
import IGenreVideosRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import AppError from '@shared/errors/AppError';
import IUpdateGenreVideoDTO from '@modules/genre_video/dtos/IUpdatedGenreVideoDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import IListGenreVideosDTO from '@modules/genre_video/dtos/IListGenreVideoDTO';
import Fakes from '@shared/utils';

class GenreVideosRepository implements IGenreVideosRepository {
  private genre_video: GenreVideo[] = [];

  public async findById({
    id,
  }: {
    id: string;
  }): Promise<GenreVideo | undefined> {
    const findGenreVideo = this.genre_video.find(
      cast_member => cast_member.id === id,
    );
    return findGenreVideo;
  }

  public async list({
    keyword = '',
    order = true,
    take = 0,
    skip = 5,
  }: IPaginationDTO): Promise<IListGenreVideosDTO> {
    const fakePagination = new Fakes.FindAndCount({
      array: this.genre_video,
      keyword,
      order,
      property: 'content',
      skip,
      take,
    });
    const genre_videos = fakePagination.findAndCount();
    return {
      total: genre_video.length,
      genre_videos,
    };
  }

  public async create(
    cast_memberData: ICreateGenreVideoDTO,
  ): Promise<GenreVideo> {
    const cast_member = new GenreVideo();
    Object.assign(cast_member, { id: uuidv4() }, cast_memberData);
    this.genre_video.push(cast_member);
    return cast_member;
  }

  public async update(
    cast_memberData: IUpdateGenreVideoDTO,
  ): Promise<GenreVideo | undefined> {
    const cast_memberIndex = this.genre_video.findIndex(
      cast_member => cast_member.id === cast_memberData.id,
    );
    if (cast_memberIndex === -1) {
      throw new AppError('GenreVideo not exist', 400);
    }
    const newGenreVideo = {
      ...this.genre_video[cast_memberIndex],
      ...cast_memberData,
    };
    this.genre_video[cast_memberIndex] = { ...newGenreVideo };
    return this.genre_video[cast_memberIndex];
  }

  public async delete({ id }: { id: string }): Promise<GenreVideo | undefined> {
    const cast_memberIndex = this.genre_video.findIndex(
      cast_member => cast_member.id === id,
    );
    if (cast_memberIndex === -1) {
      throw new AppError('GenreVideo not exist', 400);
    }
    const cast_member = this.genre_video[cast_memberIndex];
    delete this.genre_video[cast_memberIndex];
    return cast_member;
  }
}
export default GenreVideosRepository;
