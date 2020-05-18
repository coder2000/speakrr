import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntity1589291828794 implements MigrationInterface {
  name = 'AddBaseEntity1589291828794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "episode" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "author" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "author" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "queue" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "queue" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "queue" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "author" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "author" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP COLUMN "createdAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP COLUMN "updatedAt"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "episode" DROP COLUMN "createdAt"`,
      undefined,
    );
  }
}
