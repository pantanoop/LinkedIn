import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ConversationTable1774249503544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'conversations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'participants',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastMessage',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastMessageSenderId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('conversations');
  }
}
