import { injectable, inject } from 'tsyringe';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';

interface IRequest {
  id: string;
}
@injectable()
class FindPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Post | undefined> {
    const postExist = await this.postsRepository.findById({ id });
    if (!postExist) {
      throw new AppError('This post is not exist');
    }
    return postExist;
  }
}
export default FindPostService;
