import { getConnection, MigrationInterface } from 'typeorm';
import factories from '../factories';

export default class GenresSeeds1601957843023 implements MigrationInterface {
  public async up(): Promise<void> {
    const genreFactory = new factories.Genre();
    const genres = genreFactory.generate({ quantity: 5 });
    await getConnection('seed').getRepository('genres').save(genres);
  }

  public async down(): Promise<void> {
    await getConnection('seed').getRepository('genres').delete({});
  }
}
