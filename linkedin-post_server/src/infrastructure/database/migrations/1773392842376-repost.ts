import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Repost1773392842376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Reposts',
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
          },
          {
            name: 'userName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'postId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'repostedOn',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'Reposts',
      new TableForeignKey({
        columnNames: ['postId'],
        referencedTableName: 'Posts',
        referencedColumnNames: ['postId'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Reposts');

    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('postId') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey('Reposts', foreignKey);
    }

    await queryRunner.dropTable('Reposts');
  }
}
