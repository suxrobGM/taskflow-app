import { MigrationInterface, QueryRunner } from "typeorm";

export class Version00011720446713619 implements MigrationInterface {
    name = 'Version00011720446713619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'OPEN', "priority" "public"."tasks_priority_enum" NOT NULL DEFAULT 'LOW', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "dueDate" TIMESTAMP NOT NULL, "assignedUserId" uuid, "createdByUserId" uuid NOT NULL, "projectId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "createdByUserId" uuid, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_members_users" ("projectsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_43011a8c72d253c5efcf4c0a9fa" PRIMARY KEY ("projectsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f12d2be7201e8079ff063745da" ON "projects_members_users" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e4776c9ce3de6c7aa5f7d09c3" ON "projects_members_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_cf34ff7f1de7b973b7ad5f536de" FOREIGN KEY ("assignedUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e3f6e0d1ae9286f293a2e0111fd" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_35d26436e725a499a5af5b41312" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_members_users" ADD CONSTRAINT "FK_f12d2be7201e8079ff063745da5" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects_members_users" ADD CONSTRAINT "FK_4e4776c9ce3de6c7aa5f7d09c39" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_members_users" DROP CONSTRAINT "FK_4e4776c9ce3de6c7aa5f7d09c39"`);
        await queryRunner.query(`ALTER TABLE "projects_members_users" DROP CONSTRAINT "FK_f12d2be7201e8079ff063745da5"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_35d26436e725a499a5af5b41312"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e3f6e0d1ae9286f293a2e0111fd"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_cf34ff7f1de7b973b7ad5f536de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e4776c9ce3de6c7aa5f7d09c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f12d2be7201e8079ff063745da"`);
        await queryRunner.query(`DROP TABLE "projects_members_users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
    }

}
