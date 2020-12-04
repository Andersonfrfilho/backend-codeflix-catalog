import { getConnection, MigrationInterface } from 'typeorm';
import factories from '@shared/infra/typeorm/factories';

export default class CreateVideos1606525386365 implements MigrationInterface {
  name = 'CreateVideos1606525386365';

  public async up(): Promise<void> {
    const videosFactory = new factories.Video();
    const videos = videosFactory.generate({ quantity: 5 });
    await getConnection('seed').getRepository('videos').save(videos);
  }

  public async down(): Promise<void> {
    await getConnection('seed').getRepository('videos').delete({});
  }
}
