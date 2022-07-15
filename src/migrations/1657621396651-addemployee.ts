import {MigrationInterface, QueryRunner} from "typeorm";

export class addemployee1657621396651 implements MigrationInterface {
    name = 'addemployee1657621396651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "created_at"`);
    }

}
