import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1586288011982 implements MigrationInterface {
  name = 'CreateInitialTables1586288011982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "episode" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "url" varchar NOT NULL, "image" varchar NOT NULL, "type" varchar NOT NULL, "filesisze" integer NOT NULL, "explicit" boolean NOT NULL, "guid" varchar NOT NULL, "duration" varchar NOT NULL, "publication" datetime NOT NULL, "podcastId" integer)`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "image" varchar NOT NULL, "language" varchar NOT NULL, "link" varchar NOT NULL, "explicit" boolean NOT NULL, "authorId" integer)`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_episode" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "url" varchar NOT NULL, "image" varchar NOT NULL, "type" varchar NOT NULL, "filesisze" integer NOT NULL, "explicit" boolean NOT NULL, "guid" varchar NOT NULL, "duration" varchar NOT NULL, "publication" datetime NOT NULL, "podcastId" integer, CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_episode"("id", "title", "description", "url", "image", "type", "filesisze", "explicit", "guid", "duration", "publication", "podcastId") SELECT "id", "title", "description", "url", "image", "type", "filesisze", "explicit", "guid", "duration", "publication", "podcastId" FROM "episode"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "episode"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_episode" RENAME TO "episode"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "image" varchar NOT NULL, "language" varchar NOT NULL, "link" varchar NOT NULL, "explicit" boolean NOT NULL, "authorId" integer, CONSTRAINT "FK_ab01f0a2c00d90e8e4312094f14" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_podcast"("id", "title", "description", "image", "language", "link", "explicit", "authorId") SELECT "id", "title", "description", "image", "language", "link", "explicit", "authorId" FROM "podcast"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "podcast"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_podcast" RENAME TO "podcast"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "podcast" RENAME TO "temporary_podcast"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "podcast" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "image" varchar NOT NULL, "language" varchar NOT NULL, "link" varchar NOT NULL, "explicit" boolean NOT NULL, "authorId" integer)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "podcast"("id", "title", "description", "image", "language", "link", "explicit", "authorId") SELECT "id", "title", "description", "image", "language", "link", "explicit", "authorId" FROM "temporary_podcast"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_podcast"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "episode" RENAME TO "temporary_episode"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "episode" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "url" varchar NOT NULL, "image" varchar NOT NULL, "type" varchar NOT NULL, "filesisze" integer NOT NULL, "explicit" boolean NOT NULL, "guid" varchar NOT NULL, "duration" varchar NOT NULL, "publication" datetime NOT NULL, "podcastId" integer)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "episode"("id", "title", "description", "url", "image", "type", "filesisze", "explicit", "guid", "duration", "publication", "podcastId") SELECT "id", "title", "description", "url", "image", "type", "filesisze", "explicit", "guid", "duration", "publication", "podcastId" FROM "temporary_episode"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_episode"`, undefined);
    await queryRunner.query(`DROP TABLE "author"`, undefined);
    await queryRunner.query(`DROP TABLE "podcast"`, undefined);
    await queryRunner.query(`DROP TABLE "category"`, undefined);
    await queryRunner.query(`DROP TABLE "episode"`, undefined);
  }
}
