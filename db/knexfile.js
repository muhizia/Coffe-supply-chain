// Update with your config settings.
require('dotenv').config({ path: '../../config/backend/.env' });
// require('dotenv').config({ path: '/Users/muhizi/Documents/gospel/newGospel/.env' });
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: process.env.HOST,
            port: process.env.DB_PORT,
            database: process.env.DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};