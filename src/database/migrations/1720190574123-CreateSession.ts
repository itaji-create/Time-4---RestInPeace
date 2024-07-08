import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSession1720190574123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'movie_id',
            type: 'int',
          },
          {
            name: 'room',
            type: 'varchar',
          },
          {
            name: 'capacity',
            type: 'int',
          },
          {
            name: 'day',
            type: 'varchar',
          },
          {
            name: 'time',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'session',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('session');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('movie_id') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('session', foreignKey);
      }
      await queryRunner.dropTable('session');
    }
  }
}
