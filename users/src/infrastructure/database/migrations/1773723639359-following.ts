import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class Following1773723639359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Following',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'followerId',
            type: 'integer',
          },
          {
            name: 'followingId',
            type: 'integer',
          },
          {
            name: 'followedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createUniqueConstraint(
      'Following',
      new TableUnique({
        columnNames: ['followerId', 'followingId'],
      }),
    );

    await queryRunner.createForeignKeys('Following', [
      new TableForeignKey({
        columnNames: ['followerId'],
        referencedTableName: 'Users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['followingId'],
        referencedTableName: 'Users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Following');
  }
}
