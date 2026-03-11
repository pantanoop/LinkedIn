import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Likes1773229431362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Likes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'postId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],

        uniques: [
          {
            columnNames: ['userId', 'postId'],
          },
        ],

        foreignKeys: [
          {
            columnNames: ['postId'],
            referencedTableName: 'Posts',
            referencedColumnNames: ['postId'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Likes');
  }
}
