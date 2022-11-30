const knex = require('knex');
const knex_config = require('../../knexfile');

connection = knex(knex_config.development);

module.exports = connection;