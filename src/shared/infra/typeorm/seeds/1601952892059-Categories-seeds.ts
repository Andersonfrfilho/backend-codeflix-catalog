import { MigrationInterface, getConnection } from 'typeorm';
import factories from '../factories';

export default class CategoriesSeeds1601952892059
  implements MigrationInterface {
  public async up(): Promise<void> {
    const categoriesFactory = new factories.Category();
    const categories = categoriesFactory.generate({ quantity: 5 });
    await getConnection('seed').getRepository('categories').save(categories);
  }

  public async down(): Promise<void> {
    await getConnection('seed').getRepository('categories').delete({});
  }
}
