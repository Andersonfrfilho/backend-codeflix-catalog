import faker from 'faker';
import Category from '@modules/categories/infra/typeorm/entities/Category';

interface ICategoryInterfaceFactory {
  quantity: number;
}
class CategoryFactory {
  public generate({
    quantity = 1,
  }: ICategoryInterfaceFactory): Array<Category> {
    const arrayImages = Array.from(
      { length: quantity },
      (): Category => ({
        id: faker.random.uuid(),
        name: faker.name.firstName(),
        description: faker.image.avatar(),
        is_active: faker.random.boolean(),
      }),
    );
    return arrayImages;
  }
}
export default CategoryFactory;
