import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateGenreVideo1606789694770
  implements MigrationInterface {
  name = 'CreateGenreVideo1606789694770';

  public async up(): Promise<void> {
    const genres: any[] = await getConnection('seed')
      .getRepository('genres')
      .find();
    const videos: any[] = await getConnection('seed')
      .getRepository('videos')
      .find();
    const dataNumber = Array.from({ length: 5 });
    const relationshipGenreVideo = dataNumber.map(() => {
      return {
        genre_id: genres[Math.floor(Math.random() * genres.length)].id,
        video_id: videos[Math.floor(Math.random() * videos.length)].id,
      };
    });
    await getConnection('seed')
      .getRepository('genre_video')
      .save(relationshipGenreVideo);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "FK_7caa20e243e24e76542838e7a7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "FK_8c71b38f9e9840ab6553e9746dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "FK_05d080a01131964f1110186c89e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "FK_5ba6eb5d0ca5d2e582c4029db9c"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_8c71b38f9e9840ab6553e9746d"`);
    await queryRunner.query(`DROP INDEX "IDX_7caa20e243e24e76542838e7a7"`);
    await queryRunner.query(`DROP INDEX "IDX_5ba6eb5d0ca5d2e582c4029db9"`);
    await queryRunner.query(`DROP INDEX "IDX_05d080a01131964f1110186c89"`);
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "PK_12c929207a76f405d3ecfd52378"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "PK_f770e1eee3bbbec640f708c2f0f" PRIMARY KEY ("video_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ALTER COLUMN "genre_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "PK_f770e1eee3bbbec640f708c2f0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "PK_2ac384a4797268cd3af55d33623" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ALTER COLUMN "video_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "PK_9eb97b4cad667b1e3eb1639d7b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "PK_94a5e6a75080b5e9a2f80a18256" PRIMARY KEY ("video_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ALTER COLUMN "category_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "PK_94a5e6a75080b5e9a2f80a18256"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "PK_8987503dc7f5d07c3b9157c5b20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ALTER COLUMN "video_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "UQ_7caa20e243e24e76542838e7a7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "PK_2ac384a4797268cd3af55d33623"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "PK_f770e1eee3bbbec640f708c2f0f" PRIMARY KEY ("video_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ALTER COLUMN "video_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "UQ_8c71b38f9e9840ab6553e9746dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "PK_f770e1eee3bbbec640f708c2f0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "PK_12c929207a76f405d3ecfd52378" PRIMARY KEY ("genre_id", "video_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ALTER COLUMN "genre_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "UQ_05d080a01131964f1110186c89e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "PK_8987503dc7f5d07c3b9157c5b20"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "PK_94a5e6a75080b5e9a2f80a18256" PRIMARY KEY ("video_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ALTER COLUMN "video_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "UQ_5ba6eb5d0ca5d2e582c4029db9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "PK_94a5e6a75080b5e9a2f80a18256"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "PK_9eb97b4cad667b1e3eb1639d7b3" PRIMARY KEY ("category_id", "video_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ALTER COLUMN "category_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "duration" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "rating"`);
    await queryRunner.query(
      `ALTER TABLE "videos" ADD "rating" character varying(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "opened" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "opened" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "year_launched" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "videos" ALTER COLUMN "title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" ALTER COLUMN "is_active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" ALTER COLUMN "is_active" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genres" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "is_active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "is_active" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "cast_members" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "PK_167aebeac919740f03e5c34baa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "PK_2ac384a4797268cd3af55d33623" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "PK_b94ebb2410bea44465e9b771681"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "PK_8987503dc7f5d07c3b9157c5b20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" DROP CONSTRAINT "PK_2ac384a4797268cd3af55d33623"`,
    );
    await queryRunner.query(`ALTER TABLE "genre_video" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" DROP CONSTRAINT "PK_8987503dc7f5d07c3b9157c5b20"`,
    );
    await queryRunner.query(`ALTER TABLE "category_video" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "PK_2ac384a4797268cd3af55d33623" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "PK_8987503dc7f5d07c3b9157c5b20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_167aebeac919740f03e5c34baa" ON "genre_video" ("genre_id", "video_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b94ebb2410bea44465e9b77168" ON "category_video" ("category_id", "video_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "videoGenre" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "genre_video" ADD CONSTRAINT "genreVideo" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "videoCategory" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_video" ADD CONSTRAINT "categoryVideo" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
