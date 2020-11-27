import { injectable, inject } from 'tsyringe';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

interface IRequest {
  author_id: string;
  content: string;
  published: boolean;
}
@injectable()
class CreatePostService {
  constructor(
    @inject('PostRepository')
    private postsRepository: IPostsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    author_id,
    content,
    published,
  }: IRequest): Promise<Post> {
    const userExist = await this.usersRepository.findById({
      id: author_id,
    });
    if (!userExist) {
      throw new AppError('This post not exist already exist');
    }
    const post = await this.postsRepository.create({
      author_id,
      content,
      published,
    });

    await this.cacheProvider.invalidateByKey({ key: 'posts' });
    return post;
  }
}
export default CreatePostService;
