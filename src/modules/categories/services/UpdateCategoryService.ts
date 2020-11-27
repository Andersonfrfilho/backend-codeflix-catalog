import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

@injectable()
class UpdateImageService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    is_active,
  }: Category): Promise<Category | undefined> {
    const category_changed = await this.categoriesRepository.findCategoryById({
      id,
    });
    if (!category_changed) {
      throw new AppError('image does not exist', 400);
    }

    const category = await this.categoriesRepository.update({
      id,
      name,
      description,
      is_active,
    });

    return category;
  }
}
export default UpdateImageService;
