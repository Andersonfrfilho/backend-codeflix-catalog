import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  id: string;
}
@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Category | undefined> {
    const category = await this.categoriesRepository.delete({ id });
    if (!category) {
      throw new AppError('image not found', 400);
    }
    return category;
  }
}
export default DeleteCategoryService;
