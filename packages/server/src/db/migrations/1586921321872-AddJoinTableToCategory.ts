import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJoinTableToCategory1586921321872 implements MigrationInterface {
    name = 'AddJoinTableToCategory1586921321872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category_podcasts_podcast" ("categoryId" integer NOT NULL, "podcastId" integer NOT NULL, PRIMARY KEY ("categoryId", "podcastId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_859de3aea6bc194b55239d8b68" ON "category_podcasts_podcast" ("categoryId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0a8e2ddbc83b922f467fa5de69" ON "category_podcasts_podcast" ("podcastId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_859de3aea6bc194b55239d8b68"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0a8e2ddbc83b922f467fa5de69"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_category_podcasts_podcast" ("categoryId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "FK_859de3aea6bc194b55239d8b68d" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_0a8e2ddbc83b922f467fa5de69d" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("categoryId", "podcastId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_category_podcasts_podcast"("categoryId", "podcastId") SELECT "categoryId", "podcastId" FROM "category_podcasts_podcast"`, undefined);
        await queryRunner.query(`DROP TABLE "category_podcasts_podcast"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_category_podcasts_podcast" RENAME TO "category_podcasts_podcast"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_859de3aea6bc194b55239d8b68" ON "category_podcasts_podcast" ("categoryId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0a8e2ddbc83b922f467fa5de69" ON "category_podcasts_podcast" ("podcastId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_0a8e2ddbc83b922f467fa5de69"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_859de3aea6bc194b55239d8b68"`, undefined);
        await queryRunner.query(`ALTER TABLE "category_podcasts_podcast" RENAME TO "temporary_category_podcasts_podcast"`, undefined);
        await queryRunner.query(`CREATE TABLE "category_podcasts_podcast" ("categoryId" integer NOT NULL, "podcastId" integer NOT NULL, PRIMARY KEY ("categoryId", "podcastId"))`, undefined);
        await queryRunner.query(`INSERT INTO "category_podcasts_podcast"("categoryId", "podcastId") SELECT "categoryId", "podcastId" FROM "temporary_category_podcasts_podcast"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_category_podcasts_podcast"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0a8e2ddbc83b922f467fa5de69" ON "category_podcasts_podcast" ("podcastId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_859de3aea6bc194b55239d8b68" ON "category_podcasts_podcast" ("categoryId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0a8e2ddbc83b922f467fa5de69"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_859de3aea6bc194b55239d8b68"`, undefined);
        await queryRunner.query(`DROP TABLE "category_podcasts_podcast"`, undefined);
    }

}
