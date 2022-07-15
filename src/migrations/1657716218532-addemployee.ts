import {MigrationInterface, QueryRunner} from "typeorm";

export class addemployee1657716218532 implements MigrationInterface {
    name = 'addemployee1657716218532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
