import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class Connection1773740533617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'connection',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'requesterId',
            type: 'integer',
          },
          {
            name: 'receiverId',
            type: 'integer',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'ACCEPTED'],
            default: `'PENDING'`,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.createUniqueConstraint(
      'connection',
      new TableUnique({
        columnNames: ['requesterId', 'receiverId'],
      }),
    );

    await queryRunner.createForeignKeys('connection', [
      new TableForeignKey({
        columnNames: ['requesterId'],
        referencedTableName: 'Users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['receiverId'],
        referencedTableName: 'Users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('connection');
  }
}
