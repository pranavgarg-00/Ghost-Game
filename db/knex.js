const knexfile = require('../knexfile.js');
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const knexConfig = knexfile[process.env.NODE_ENV];

module.exports = require('knex')(knexConfig);
