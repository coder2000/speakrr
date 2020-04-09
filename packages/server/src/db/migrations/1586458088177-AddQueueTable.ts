import {MigrationInterface, QueryRunner} from "typeorm";

export class AddQueueTable1586458088177 implements MigrationInterface {
    name = 'AddQueueTable1586458088177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_episode" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "url" varchar NOT NULL, "image" varchar NOT NULL, "type" varchar NOT NULL, "filesize" integer NOT NULL, "explicit" boolean NOT NULL, "guid" varchar NOT NULL, "duration" varchar NOT NULL, "publication" datetime NOT NULL, "podcastId" integer, CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_episode"("id", "title", "description", "url", "image", "type", "filesize", "explicit", "guid", "duration", "publication", "podcastId") SELECT "id", "title", "description", "url", "image", "type", "filesisze", "explicit", "guid", "duration", "publication", "podcastId" FROM "episode"`, undefined);
        await queryRunner.query(`DROP TABLE "episode"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_episode" RENAME TO "episode"`, undefined);
        await queryRunner.query(`CREATE TABLE "queue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "completed" boolean NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "queue"`, undefined);
        await queryRunner.query(`ALTER TABLE "episode" RENAME TO "temporary_episode"`, undefined);
        await queryRunner.query(`CREATE TABLE "episode" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "url" varchar NOT NULL, "image" varchar NOT NULL, "type" varchar NOT NULL, "filesisze" integer NOT NULL, "explicit" boolean NOT NULL, "guid" varchar NOT NULL, "duration" varchar NOT NULL, "publication" datetime NOT NULL, "podcastId" integer, CONSTRAINT "FK_553934f46dc107c0ce9326d2419" FOREIGN KEY ("podcastId") REFERENCES "podcast" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "episode"("id", "title", "description", "url", "image", "type", "filesisze", "explicit", "guid", "duration", "publication", "podcastId") SELECT "id", "title", "description", "url", "image", "type", "filesize", "explicit", "guid", "duration", "publication", "podcastId" FROM "temporary_episode"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_episode"`, undefined);
    }

}
