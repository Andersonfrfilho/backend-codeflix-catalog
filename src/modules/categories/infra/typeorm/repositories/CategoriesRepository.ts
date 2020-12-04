import { getRepository, Raw, Repository } from 'typeorm';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/categories/dtos/IUpdateCategoryDTO';
import AppError from '@shared/errors/AppError';
import IPagination, { EOrder } from '@shared/dtos/IPaginatedDTO';
import IListCategoriesDTO from '@modules/categories/dtos/IListCategoriesDTO';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByName({
    name,
  }: {
    name: string;
  }): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({ where: { name } });
    return findCategory;
  }

  public async findById({ id }: { id: string }): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { id },
    });
    return findCategory;
  }

  public async list({
    keyword,
    order,
    skip,
    take,
  }: IPagination): Promise<IListCategoriesDTO> {
    const [result, total] = await this.ormRepository.findAndCount({
      where: {
        name: Raw(category => `${category} ILIKE '%${keyword}%'`),
      },
      order: { name: order ? EOrder.DESC : EOrder.ASC },
      take,
      skip,
      relations: ['videos'],
    });
    return {
      total,
      categories: result,
    };
  }

  public async create({
    name,
    is_active,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      is_active,
      description,
    });
    await this.ormRepository.save(category);
    return category;
  }

  public async update({
    id,
    description,
    is_active,
    name,
  }: Category): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { id },
    });
    if (!findCategory) {
      throw new AppError('Category don`t exist', 400);
    }
    const newCategoryAttributes = await this.ormRepository.save({
      ...findCategory,
      description,
      is_active,
      name,
    });
    return newCategoryAttributes;
  }

  public async delete({ id }: { id: string }): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { id },
    });
    if (!findCategory) {
      throw new AppError('Category dont exist', 400);
    }
    await this.ormRepository.remove(findCategory);
    return findCategory;
  }
}
export default CategoriesRepository;
