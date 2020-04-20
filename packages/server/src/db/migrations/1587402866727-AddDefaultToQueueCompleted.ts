import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultToQueueCompleted1587402866727 implements MigrationInterface {
    name = 'AddDefaultToQueueCompleted1587402866727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_queue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "completed" boolean DEFAULT (0))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_queue"("id", "url", "completed") SELECT "id", "url", "completed" FROM "queue"`, undefined);
        await queryRunner.query(`DROP TABLE "queue"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_queue" RENAME TO "queue"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue" RENAME TO "temporary_queue"`, undefined);
        await queryRunner.query(`CREATE TABLE "queue" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL, "completed" boolean)`, undefined);
        await queryRunner.query(`INSERT INTO "queue"("id", "url", "completed") SELECT "id", "url", "completed" FROM "temporary_queue"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_queue"`, undefined);
    }

}
