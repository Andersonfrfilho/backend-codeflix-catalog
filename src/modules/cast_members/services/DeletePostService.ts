import { injectable, inject } from 'tsyringe';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class DeletePostService {
  constructor(
    @inject('PostRepository')
    private postsRepository: IPostsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: { id: string }): Promise<Post | undefined> {
    const post = await this.postsRepository.findById({ id });
    if (!post) {
      throw new AppError('This post is already exist');
    }
    await this.postsRepository.delete({ id });
    await this.cacheProvider.invalidateByKey({ key: 'posts' });
    return post;
  }
}
export default DeletePostService;
