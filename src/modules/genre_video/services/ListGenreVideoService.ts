import { injectable, inject } from 'tsyringe';
import IListGenreVideoDTO from '@modules/genre_video/dtos/IListGenreVideoDTO';
import ICastMembersRepository from '@modules/genre_video/repositories/IGenreVideoRepository';
import IPagination from '@shared/dtos/IPaginatedDTO';

@injectable()
class FindGenreVideoService {
  constructor(
    @inject('GenreVideoRepository')
    private genreVideoRepository: ICastMembersRepository,
  ) {}

  public async execute(data: IPagination): Promise<IListGenreVideoDTO> {
    const genre_video = await this.genreVideoRepository.list(data);
    return genre_video;
  }
}
export default FindGenreVideoService;
