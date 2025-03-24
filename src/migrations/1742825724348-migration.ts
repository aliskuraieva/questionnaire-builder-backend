import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742825724348 implements MigrationInterface {
    name = 'Migration1742825724348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questionnaires" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_a01d7cdea895ed9796b29233610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "questionText" character varying NOT NULL, "type" character varying NOT NULL, "questionnaireId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "questionId" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "responses" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "answerId" integer, "questionnaireId" integer, CONSTRAINT "PK_be3bdac59bd243dff421ad7bf70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a25e444b4f0c7e666a72b702880" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_a3aca8947fa6e979453cf6a4ef5" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "FK_564f3bbda9bbf99b0fce8d1e948" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_564f3bbda9bbf99b0fce8d1e948"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_a3aca8947fa6e979453cf6a4ef5"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a25e444b4f0c7e666a72b702880"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "questionnaires"`);
    }

}
