import { injectable, inject } from 'tsyringe';
import IListPostsDTO from '@modules/posts/dtos/IListPostsDTO';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import IPagination from '@shared/dtos/IPaginatedDTO';

@injectable()
class FindPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(data: IPagination): Promise<IListPostsDTO> {
    const posts = await this.postsRepository.list(data);
    return posts;
  }
}
export default FindPostService;
