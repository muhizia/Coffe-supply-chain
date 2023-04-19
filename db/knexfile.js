// Update with your config settings.
// require('dotenv').config({ path: '../../config/backend/.env' });
// require('dotenv').config({ path: '/Users/muhizi/Documents/gospel/newGospel/.env' });
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL, //process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 100
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 100
        },
        migrations: {
            tableName: 'migrations'
        }
    }

};