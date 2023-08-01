import { MigrationInterface, QueryRunner } from "typeorm";

export class FavoritesMigration1690837258537 implements MigrationInterface {
    name = 'FavoritesMigration1690837258537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_artists_artist" ("favoriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_9daf4f3eab7a3ee1831d06356af" PRIMARY KEY ("favoriteId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc6278dcd7f4ec83657af3d66c" ON "favorite_artists_artist" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d712ba0a257e954870e3114f25" ON "favorite_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favorite_albums_album" ("favoriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4247432ea32c9166fead9833826" PRIMARY KEY ("favoriteId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c2bdc9716bf0cf30d4275ceefc" ON "favorite_albums_album" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd3dab78afa4f449ef616a2449" ON "favorite_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favorite_tracks_track" ("favoriteId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_a16bd1c831b4a8f6b310051b845" PRIMARY KEY ("favoriteId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb76ffcbfc9c6a378285930a7a" ON "favorite_tracks_track" ("favoriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1158b152c3524f350f70a32a20" ON "favorite_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" ADD CONSTRAINT "FK_fc6278dcd7f4ec83657af3d66c4" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" ADD CONSTRAINT "FK_d712ba0a257e954870e3114f250" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" ADD CONSTRAINT "FK_c2bdc9716bf0cf30d4275ceefcf" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" ADD CONSTRAINT "FK_bd3dab78afa4f449ef616a24491" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks_track" ADD CONSTRAINT "FK_eb76ffcbfc9c6a378285930a7a7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks_track" ADD CONSTRAINT "FK_1158b152c3524f350f70a32a205" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_tracks_track" DROP CONSTRAINT "FK_1158b152c3524f350f70a32a205"`);
        await queryRunner.query(`ALTER TABLE "favorite_tracks_track" DROP CONSTRAINT "FK_eb76ffcbfc9c6a378285930a7a7"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" DROP CONSTRAINT "FK_bd3dab78afa4f449ef616a24491"`);
        await queryRunner.query(`ALTER TABLE "favorite_albums_album" DROP CONSTRAINT "FK_c2bdc9716bf0cf30d4275ceefcf"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" DROP CONSTRAINT "FK_d712ba0a257e954870e3114f250"`);
        await queryRunner.query(`ALTER TABLE "favorite_artists_artist" DROP CONSTRAINT "FK_fc6278dcd7f4ec83657af3d66c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1158b152c3524f350f70a32a20"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb76ffcbfc9c6a378285930a7a"`);
        await queryRunner.query(`DROP TABLE "favorite_tracks_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bd3dab78afa4f449ef616a2449"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2bdc9716bf0cf30d4275ceefc"`);
        await queryRunner.query(`DROP TABLE "favorite_albums_album"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d712ba0a257e954870e3114f25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc6278dcd7f4ec83657af3d66c"`);
        await queryRunner.query(`DROP TABLE "favorite_artists_artist"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
