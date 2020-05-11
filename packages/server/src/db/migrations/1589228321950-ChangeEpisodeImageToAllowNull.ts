import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeEpisodeImageToAllowNull1589228321950
  implements MigrationInterface {
  name = 'ChangeEpisodeImageToAllowNull1589228321950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "episode" ALTER COLUMN "image" DROP NOT NULL`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "episode" ALTER COLUMN "image" SET NOT NULL`,
      undefined,
    );
  }
}
