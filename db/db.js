const knex = require('knex');
const knexFile = require('./knexfile');

var db;
if (process.env.NODE_ENV === 'development') {
    db = knex(knexFile.development);
} else {
    db = knex(knexFile.production);
}
module.exports = db;