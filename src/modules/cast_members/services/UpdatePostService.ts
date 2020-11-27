import { injectable, inject } from 'tsyringe';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: string;
  author_id: string;
  content: string;
  published: boolean;
}
@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    author_id,
    content,
    published,
  }: IRequest): Promise<Post | undefined> {
    const postExist = await this.postsRepository.findById({ id });
    if (!postExist) {
      throw new AppError('Only authenticated post can change avatar', 401);
    }
    if (!(postExist.author_id === author_id)) {
      throw new AppError('Only authenticated post can change avatar', 401);
    }
    const post = await this.postsRepository.update({
      id,
      author_id,
      content,
      published,
    });
    await this.cacheProvider.invalidateByKey({ key: 'posts' });
    return post;
  }
}
export default UpdatePostService;
