import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
  is_active: boolean;
}
@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    description,
    is_active,
    name,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      description,
      is_active,
      name,
    });
    return category;
  }
}
export default CreateCategoryService;
