import CategoryVideo from '@modules/category_video/infra/typeorm/entities/CategoryVideo';
import ICreateCategoryVideoDTO from '@modules/category_video/dtos/ICreateCategoryVideoDTO';
import IPagination from '@shared/dtos/IPaginatedDTO';
import IListCategoryVideosDTO from '@modules/category_video/dtos/IListCategoryVideoDTO';
import IUpdateCategoryVideoDTO from '@modules/category_video/dtos/IUpdatedCategoryVideoDTO';

export default interface ICategoryVideosRepository {
  findById({ id }: { id: string }): Promise<CategoryVideo | undefined>;
  create(data: ICreateCategoryVideoDTO): Promise<CategoryVideo>;
  list(data: IPagination): Promise<IListCategoryVideosDTO>;
  update(data: IUpdateCategoryVideoDTO): Promise<CategoryVideo | undefined>;
  delete({ id }: { id: string }): Promise<CategoryVideo | undefined>;
}
