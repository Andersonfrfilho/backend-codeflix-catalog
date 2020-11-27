import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import IUpdateCategoryDTO from '@modules/categories/dtos/IUpdateCategoryDTO';
import IPaginationDTO from '@shared/dtos/IPaginatedDTO';
import IListUsersDTO from '@modules/categories/dtos/IListCategoriesDTO';

export default interface ICategorysRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  delete({ id }: { id: string }): Promise<Category | undefined>;
  update(data: IUpdateCategoryDTO): Promise<Category | undefined>;
  list(data: IPaginationDTO): Promise<IListUsersDTO>;
  findCategoryById({ id }: { id: string }): Promise<Category | undefined>;
}
