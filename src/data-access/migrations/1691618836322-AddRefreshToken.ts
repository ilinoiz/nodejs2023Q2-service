import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToken1691618836322 implements MigrationInterface {
  name = 'AddRefreshToken1691618836322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" text`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "tokenExpirationDate" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "tokenExpirationDate"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
