import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IPagination from '@shared/dtos/IPaginatedDTO';
import IListCategoriesDTO from '@modules/categories/dtos/IListCategoriesDTO';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(data: IPagination): Promise<IListCategoriesDTO> {
    const categories = await this.categoriesRepository.list(data);

    return categories;
  }
}
export default ListCategoriesService;
