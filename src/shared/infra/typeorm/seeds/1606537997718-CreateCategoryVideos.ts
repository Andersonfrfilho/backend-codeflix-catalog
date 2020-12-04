import { getConnection, MigrationInterface } from 'typeorm';

export default class CreateCategoryVideos1606537997718
  implements MigrationInterface {
  name = 'CreateCategoryVideos1606537997718';

  public async up(): Promise<void> {
    const categories: any[] = await getConnection('seed')
      .getRepository('categories')
      .find();
    const videos: any[] = await getConnection('seed')
      .getRepository('videos')
      .find();
    const dataNumber = Array.from({ length: 5 });
    const relationshipCategoryVideo = dataNumber.map(() => {
      return {
        category_id:
          categories[Math.floor(Math.random() * categories.length)].id,
        video_id: videos[Math.floor(Math.random() * videos.length)].id,
      };
    });
    await getConnection('seed')
      .getRepository('category_video')
      .save(relationshipCategoryVideo);
  }

  public async down(): Promise<void> {
    await getConnection('seed').getRepository('category_video').delete({});
  }
}
