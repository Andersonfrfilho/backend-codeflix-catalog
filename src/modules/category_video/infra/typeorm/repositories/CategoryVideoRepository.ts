import { getRepository, Raw, Repository } from 'typeorm';
import CategoryVideo from '@modules/category_video/infra/typeorm/entities/CategoryVideo';
import ICreateCategoryVideoDTO from '@modules/category_video/dtos/ICreateCategoryVideoDTO';
import ICategoryVideosRepository from '@modules/category_video/repositories/ICategoryVideoRepository';
import IPaginate, { EOrder } from '@shared/dtos/IPaginatedDTO';
import IListCategoryVideosDTO from '@modules/category_video/dtos/IListCategoryVideoDTO';

class CategoryVideosRepository implements ICategoryVideosRepository {
  private ormRepository: Repository<CategoryVideo>;

  constructor() {
    this.ormRepository = getRepository(CategoryVideo);
  }

  public async findById({
    id,
  }: {
    id: string;
  }): Promise<CategoryVideo | undefined> {
    const category_video = await this.ormRepository.findOne(id);
    return category_video;
  }

  public async create(
    category_videoData: ICreateCategoryVideoDTO,
  ): Promise<CategoryVideo> {
    const category_video = this.ormRepository.create(category_videoData);
    await this.ormRepository.save(category_video);
    return category_video;
  }

  public async save(category_video: CategoryVideo): Promise<CategoryVideo> {
    return this.ormRepository.save(category_video);
  }

  public async list({
    take,
    skip,
    keyword,
    order,
  }: IPaginate): Promise<IListCategoryVideosDTO> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        name: Raw(category_video => `${category_video} ILIKE '%${keyword}%'`),
      },
      order: { created_at: order ? EOrder.DESC : EOrder.ASC },
      take,
      skip,
    });
    return { total, category_video: result };
  }

  public async update(
    category_videoData: Partial<CategoryVideo>,
  ): Promise<CategoryVideo | undefined> {
    const category_videoExist = await this.ormRepository.findOne({
      where: { id: category_videoData.id },
    });
    const category_video = await this.ormRepository.save({
      ...category_videoExist,
      ...category_videoData,
    });
    return category_video;
  }

  public async delete({
    id,
  }: {
    id: string;
  }): Promise<CategoryVideo | undefined> {
    const category_videoExist = await this.ormRepository.findOneOrFail({
      where: { id },
    });
    await this.ormRepository.delete({ id });
    return category_videoExist;
  }
}
export default CategoryVideosRepository;
