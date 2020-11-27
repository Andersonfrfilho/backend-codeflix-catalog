import { v4 as uuidv4 } from 'uuid';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import AppError from '@shared/errors/AppError';
import IUpdatePostDTO from '@modules/posts/dtos/IUpdatedPostDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import IListPostsDTO from '@modules/posts/dtos/IListPostsDTO';
import Fakes from '@shared/utils';

class PostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findById({ id }: { id: string }): Promise<Post | undefined> {
    const findPost = this.posts.find(post => post.id === id);
    return findPost;
  }

  public async list({
    keyword = '',
    order = true,
    take = 0,
    skip = 5,
  }: IPaginationDTO): Promise<IListPostsDTO> {
    const fakePagination = new Fakes.FindAndCount({
      array: this.posts,
      keyword,
      order,
      property: 'content',
      skip,
      take,
    });
    const posts = fakePagination.findAndCount();
    return {
      total: posts.length,
      posts,
    };
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = new Post();
    Object.assign(post, { id: uuidv4() }, postData);
    this.posts.push(post);
    return post;
  }

  public async update(postData: IUpdatePostDTO): Promise<Post | undefined> {
    const postIndex = this.posts.findIndex(post => post.id === postData.id);
    if (postIndex === -1) {
      throw new AppError('Post not exist', 400);
    }
    const newPost = {
      ...this.posts[postIndex],
      ...postData,
    };
    this.posts[postIndex] = { ...newPost };
    return this.posts[postIndex];
  }

  public async delete({ id }: { id: string }): Promise<Post | undefined> {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new AppError('Post not exist', 400);
    }
    const post = this.posts[postIndex];
    delete this.posts[postIndex];
    return post;
  }
}
export default PostsRepository;
