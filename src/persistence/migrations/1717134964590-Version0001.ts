import { MigrationInterface, QueryRunner } from "typeorm";

export class Version00011717134964590 implements MigrationInterface {
    name = 'Version00011717134964590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'OPEN', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'LOW', "createdDate" date NOT NULL DEFAULT now(), "dueDate" date NOT NULL, "assignedUserId" uuid, "createdByUserId" uuid NOT NULL, "projectId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "createdDate" date NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "createdDate" date NOT NULL DEFAULT now(), "createdByUserId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_members_user" ("projectId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_72827104fc2fdddc050b4064da1" PRIMARY KEY ("projectId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c79bdce48cf47ff04f1ec3a8ca" ON "project_members_user" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_66c5703c0321bafc7c9352098b" ON "project_members_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b5dae9857187a41d7d09e07b7e3" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_81cfa14e564988a5025c362f513" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members_user" ADD CONSTRAINT "FK_c79bdce48cf47ff04f1ec3a8ca5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_members_user" ADD CONSTRAINT "FK_66c5703c0321bafc7c9352098b5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_members_user" DROP CONSTRAINT "FK_66c5703c0321bafc7c9352098b5"`);
        await queryRunner.query(`ALTER TABLE "project_members_user" DROP CONSTRAINT "FK_c79bdce48cf47ff04f1ec3a8ca5"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_81cfa14e564988a5025c362f513"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b5dae9857187a41d7d09e07b7e3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66c5703c0321bafc7c9352098b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c79bdce48cf47ff04f1ec3a8ca"`);
        await queryRunner.query(`DROP TABLE "project_members_user"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
