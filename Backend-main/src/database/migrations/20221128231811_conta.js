/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('contas', function (table) {  //cria  tabela conta
        table.string('id').primary();
        table.string('agencia').notNullable();
        table.string('banco').notNullable();
        table.string('nome_titular').notNullable();
        table.integer('saldo').notNullable();
        table.string('user_id').unsigned();
        table.foreign('user_id').references('users.id'); //chave estrangeira para o usuário da conta
      });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
