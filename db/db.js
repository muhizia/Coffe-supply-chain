const knex = require('knex');
const knexFile = require('./knexfile');

var db;
if (process.env.NODE_ENV === 'developmet') {
    db = knex(knexFile.development);
} else {
    db = knex(knexFile.production);
}
module.exports = db;