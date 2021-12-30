
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 4')
        .then(function () { 
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, name: 'Daniel Y'},
          {id: 2, name: 'Hester O'},
          {id: 3, name: 'Betty W'}
        ]);
    });
})};
