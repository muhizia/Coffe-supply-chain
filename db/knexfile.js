// Update with your config settings.
// require('dotenv').config({ path: '../../config/backend/.env' });
require('dotenv').config();

module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/data/coffee.sqlite`,
        },
        useNullAsDefault: true,
        pool: {
            min: 2,
            max: 100
        },
        migrations: {
            tableName: 'migrations'
        }
    },
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