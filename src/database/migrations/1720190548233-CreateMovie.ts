import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovie1720190548233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'actors',
            type: 'text',
          },
          {
            name: 'release_date',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie');
  }
}
