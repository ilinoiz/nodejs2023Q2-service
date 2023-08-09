import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1691533172295 implements MigrationInterface {
  name = 'InitialMigration1691533172295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "expirationDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "refreshTokenId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_7c91492fa6749e6d222216fa874" FOREIGN KEY ("refreshTokenId") REFERENCES "refresh_token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_7c91492fa6749e6d222216fa874"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshTokenId"`);
    await queryRunner.query(`DROP TABLE "refresh_token"`);
  }
}
