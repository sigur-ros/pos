import {MigrationInterface, QueryRunner} from "typeorm";

export class TestMigration1613832988787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "test" "text"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`)
    }

}
