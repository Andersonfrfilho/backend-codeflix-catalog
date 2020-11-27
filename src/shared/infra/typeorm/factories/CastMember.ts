import faker from 'faker';
import CastMember from '@modules/cast_members/infra/typeorm/entities/CastMember';

interface IProfileInterfaceFactory {
  quantity: number;
}

class CastMemberFactory {
  public generate({
    quantity = 1,
  }: IProfileInterfaceFactory): Partial<CastMember>[] {
    const arrayCastMembers = Array.from(
      { length: quantity },
      (): Partial<CastMember> => ({
        name: faker.name.jobType(),
        type: faker.random.number(),
      }),
    );
    return arrayCastMembers;
  }
}
export default CastMemberFactory;
