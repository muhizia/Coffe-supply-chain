// Update with your config settings.
// require('dotenv').config({ path: '../../config/backend/.env' });
// require('dotenv').config({ path: '/Users/muhizi/Documents/gospel/newGospel/.env' });
module.exports = {
    development: {
        client: 'pg',
        connection: 'psql://muhizi:muhizi123@db:5432/coffee_supply_chain', //process.env.DATABASE_URL,
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
        connection: 'psql://muhizi:muhizi123@db:5432/coffee_supply_chain',
        pool: {
            min: 2,
            max: 100
        },
        migrations: {
            tableName: 'migrations'
        }
    }

};