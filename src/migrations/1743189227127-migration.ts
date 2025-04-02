import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743189227127 implements MigrationInterface {
    name = 'Migration1743189227127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "questionText" character varying NOT NULL, "type" character varying NOT NULL, "choices" text array NOT NULL, "answers" text array NOT NULL, "questionnaireId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_3f7828c3b2c8db7b5e41cade66a" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_3f7828c3b2c8db7b5e41cade66a"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
