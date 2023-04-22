const knex = require('knex');
const knexFile = require('./knexfile');

var db;
if (process.env.NODE_ENV === 'development') {
    db = knex(knexFile.development);
} else if (process.env.NODE_ENV === 'test') {
    db = knex(knexFile.test);
} else {
    db = knex(knexFile.production);
}
module.exports = db;