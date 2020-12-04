import CategoryVideo from '@modules/category_video/infra/typeorm/entities/CategoryVideo';

export default interface IListCategoryVideoServiceReturn {
  cast_members: CategoryVideo[];
  total: number;
}
