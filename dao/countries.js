const db = require('../db/db');

class CountryDAO {
    async getCountryById(id) {
        const obj = await db.select('id', 'names').from('countries').where({ 'id': id });
        return obj;
    }

    async getCountries() {
        const obj = await db.select('id', 'names').from('countries');
        return obj;
    }

    async updateCountry(name, id) {
        const obj = await db('countries').update({'names': name, 'created_at': new Date() }).where({'id': id}).returning('*');
        return obj;
    }
    async create(name){
        const obj = await db.insert({ 'names': name, 'created_at': new Date() }).into("countries").returning("*");
        return obj;
    }
}

module.exports = new CountryDAO();