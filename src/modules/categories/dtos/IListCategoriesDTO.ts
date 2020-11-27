import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface IListCategoryServiceDTO {
  categories: Category[];
  total: number;
}
