
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
