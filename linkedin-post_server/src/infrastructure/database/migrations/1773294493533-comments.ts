import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Comments1773294493533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Comments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'commentId',
            type: 'uuid',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'postId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'profileUrl',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'parentId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],

        foreignKeys: [
          {
            columnNames: ['postId'],
            referencedTableName: 'Posts',
            referencedColumnNames: ['postId'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['parentId'],
            referencedTableName: 'Comments',
            referencedColumnNames: ['commentId'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Comments');
  }
}
