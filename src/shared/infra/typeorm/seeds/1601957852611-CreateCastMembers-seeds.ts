import { getConnection, MigrationInterface } from 'typeorm';
import factories from '../factories';

export default class OfficesSeeds1601957852611 implements MigrationInterface {
  public async up(): Promise<void> {
    const castMembersFactory = new factories.CastMember();
    const cast_members = castMembersFactory.generate({ quantity: 5 });
    await getConnection('seed')
      .getRepository('cast_members')
      .save(cast_members);
  }

  public async down(): Promise<void> {
    await getConnection('seed').getRepository('cast_members').delete({});
  }
}
