import faker from 'faker';
import Video, {
  RATING_LIST,
} from '@modules/videos/infra/typeorm/entities/Video';

interface IProfileInterfaceFactory {
  quantity: number;
}
const enums = ['L ', 'THEN', 'TWELVE', 'FOURTEEN', 'EIGHTEEN'];
class CastMemberFactory {
  public generate({
    quantity = 1,
  }: IProfileInterfaceFactory): Partial<Video>[] {
    const arrayCastMembers = Array.from(
      { length: quantity },
      (): Partial<Video> => ({
        title: faker.name.firstName(),
        name: faker.name.firstName(),
        description: faker.random.words(),
        year_launched: faker.random.number(),
        opened: faker.random.boolean(),
        rating: RATING_LIST.L,
        duration: faker.random.number(),
      }),
    );
    return arrayCastMembers;
  }
}
export default CastMemberFactory;
