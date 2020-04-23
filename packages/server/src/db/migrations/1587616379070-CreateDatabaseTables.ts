import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabaseTables1587616379070 implements MigrationInterface {
    name = 'CreateDatabaseTables1587616379070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episode" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "image" character varying NOT NULL, "type" character varying NOT NULL, "filesize" integer NOT NULL, "explicit" boolean NOT NULL, "guid" character varying NOT NULL, "duration" character varying NOT NULL, "publication" TIMESTAMP NOT NULL, "podcastId" integer, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "podcast" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "language" character varying NOT NULL, "link" character varying NOT NULL, "explicit" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_8938ce8558ac308bea99f4360e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "queue" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "completed" boolean DEFAULT false, CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "category_podcasts_podcast" ("categoryId" integer NOT NULL, "podcastId" integer NOT NULL, CONSTRAINT "PK_504025914491ac02b9d66ae9159" PRIMARY KEY ("categoryId", "podcastId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_859de3aea6bc194b55239d8b68" ON "category_podcasts_podcast" ("categoryId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0a8e2ddbc83b922f467fa5de69" ON "category_podcasts_podcast" ("podcastId") `, undefined);
        await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "podcast" ADD CONSTRAINT "FK_ab01f0a2c00d90e8e4312094f14" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "category_podcasts_podcast" ADD CONSTRAINT "FK_859de3aea6bc194b55239d8b68d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "category_podcasts_podcast" ADD CONSTRAINT "FK_0a8e2ddbc83b922f467fa5de69d" FOREIGN KEY ("podcastId") REFERENCES "podcast"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_podcasts_podcast" DROP CONSTRAINT "FK_0a8e2ddbc83b922f467fa5de69d"`, undefined);
        await queryRunner.query(`ALTER TABLE "category_podcasts_podcast" DROP CONSTRAINT "FK_859de3aea6bc194b55239d8b68d"`, undefined);
        await queryRunner.query(`ALTER TABLE "podcast" DROP CONSTRAINT "FK_ab01f0a2c00d90e8e4312094f14"`, undefined);
        await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT "FK_553934f46dc107c0ce9326d2419"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0a8e2ddbc83b922f467fa5de69"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_859de3aea6bc194b55239d8b68"`, undefined);
        await queryRunner.query(`DROP TABLE "category_podcasts_podcast"`, undefined);
        await queryRunner.query(`DROP TABLE "queue"`, undefined);
        await queryRunner.query(`DROP TABLE "author"`, undefined);
        await queryRunner.query(`DROP TABLE "podcast"`, undefined);
        await queryRunner.query(`DROP TABLE "category"`, undefined);
        await queryRunner.query(`DROP TABLE "episode"`, undefined);
    }

}
