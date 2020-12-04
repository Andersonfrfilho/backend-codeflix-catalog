import { injectable, inject } from 'tsyringe';
import CategoryVideo from '@modules/category_video/infra/typeorm/entities/CategoryVideo';
import AppError from '@shared/errors/AppError';
import ICategoryVideosRepository from '@modules/category_video/repositories/ICategoryVideoRepository';
import ICreateCategoryVideoDTO from '@modules/category_video/dtos/ICreateCategoryVideoDTO';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';

@injectable()
class CreateVideoService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
    @inject('VideosRepository')
    private videosRepository: VideosRepository,
    @inject('CategoryVideoRepository')
    private categoryVideoRepository: ICategoryVideosRepository,
  ) {}

  public async execute({
    category_id,
    video_id,
  }: ICreateCategoryVideoDTO): Promise<CategoryVideo> {
    const category_exist = await this.categoriesRepository.findCategoryById({
      id: category_id,
    });
    if (!category_exist) {
      throw new AppError('category not exist', 400);
    }
    const video_exist = await this.videosRepository.findVideoById({
      id: video_id,
    });
    if (!video_exist) {
      throw new AppError('video not exist', 400);
    }
    const cast_member = await this.categoryVideoRepository.create({
      category_id: category_exist.id,
      video_id: video_exist.id,
    });

    return cast_member;
  }
}
export default CreateVideoService;
