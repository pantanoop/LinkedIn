import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Education1773998703065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'education',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'institutionName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'degree',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fieldOfStudy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'startMonth',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'startYear',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'endMonth',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'endYear',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'education',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'Users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('education');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey('education', foreignKey);
    }

    await queryRunner.dropTable('education');
  }
}
