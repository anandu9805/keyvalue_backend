import {MigrationInterface, QueryRunner} from "typeorm";

export class addemployee1657709114779 implements MigrationInterface {
    name = 'addemployee1657709114779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
