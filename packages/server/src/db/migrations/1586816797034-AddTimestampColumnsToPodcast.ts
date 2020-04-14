import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTimestampColumnsToPodcast1586816797034 implements MigrationInterface {
    name = 'AddTimestampColumnsToPodcast1586816797034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "image" varchar NOT NULL, "language" varchar NOT NULL, "link" varchar NOT NULL, "explicit" boolean NOT NULL, "authorId" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ab01f0a2c00d90e8e4312094f14" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_podcast"("id", "title", "description", "image", "language", "link", "explicit", "authorId") SELECT "id", "title", "description", "image", "language", "link", "explicit", "authorId" FROM "podcast"`, undefined);
        await queryRunner.query(`DROP TABLE "podcast"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_podcast" RENAME TO "podcast"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "podcast" RENAME TO "temporary_podcast"`, undefined);
        await queryRunner.query(`CREATE TABLE "podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "image" varchar NOT NULL, "language" varchar NOT NULL, "link" varchar NOT NULL, "explicit" boolean NOT NULL, "authorId" integer, CONSTRAINT "FK_ab01f0a2c00d90e8e4312094f14" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "podcast"("id", "title", "description", "image", "language", "link", "explicit", "authorId") SELECT "id", "title", "description", "image", "language", "link", "explicit", "authorId" FROM "temporary_podcast"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_podcast"`, undefined);
    }

}
