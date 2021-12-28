const config = require('dotenv').config();
if (config.error) throw config.error;
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const { parsed: envs } = config;
module.exports = envs;