import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PostTable1771240753080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Posts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'postId',
            type: 'uuid',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'userid',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userName',
            type: 'varchar',
          },
          {
            name: 'userTitle',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'imageUrls',
            type: 'text',
            isArray: true,
            isNullable: true,
          },
          {
            name: 'profileUrl',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'postType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'postedOn',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Posts');
  }
}
