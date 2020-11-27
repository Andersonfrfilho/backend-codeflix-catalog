import faker from 'faker';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';

interface IGenreInterfaceFactory {
  quantity: number;
}
class GenreFactory {
  public generate({ quantity = 1 }: IGenreInterfaceFactory): Array<Genre> {
    const arrayImages = Array.from(
      { length: quantity },
      (): Genre => ({
        id: faker.random.uuid(),
        name: faker.name.firstName(),
        is_active: faker.random.boolean(),
      }),
    );
    return arrayImages;
  }
}
export default GenreFactory;
