import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserProfileTable1771240753082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userid',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'profileName',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'userTitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'about',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'profileUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'coverUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'followersCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'followingCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'connectionsCount',
            type: 'integer',
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users');
  }
}
