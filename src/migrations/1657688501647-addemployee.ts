import {MigrationInterface, QueryRunner} from "typeorm";

export class addemployee1657688501647 implements MigrationInterface {
    name = 'addemployee1657688501647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employeeaddress" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street_name" character varying NOT NULL, "state_name" character varying NOT NULL, "house_number" character varying NOT NULL, "employee_id" uuid NOT NULL, CONSTRAINT "REL_520b58f04b6b1572d10e76bb6f" UNIQUE ("employee_id"), CONSTRAINT "PK_42ad9c0eb4a96c721afaf7487d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD CONSTRAINT "FK_520b58f04b6b1572d10e76bb6f9" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP CONSTRAINT "FK_520b58f04b6b1572d10e76bb6f9"`);
        await queryRunner.query(`DROP TABLE "employeeaddress"`);
    }

}
