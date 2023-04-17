const knex = require('knex');
const knexFile = require('./knexfile');

var db;
if (process.env.NODE_ENV === 'developmet') {
    console.log('------>', 1)
    db = knex(knexFile.development);
} else {
    console.log('------>', 2)
    db = knex(knexFile.production);
}
module.exports = db;