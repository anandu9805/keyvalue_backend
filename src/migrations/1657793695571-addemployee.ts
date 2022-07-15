import {MigrationInterface, QueryRunner} from "typeorm";

export class addemployee1657793695571 implements MigrationInterface {
    name = 'addemployee1657793695571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "address_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "employeeaddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "address_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "employeeaddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying NOT NULL`);
    }

}
