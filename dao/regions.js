const db = require('../db/db');

class RegionDAO {

    async getRegionById(id) {
        const obj = await db.select('id', 'names').from('regions').where({ 'id': id });
        return obj;
    }

    async getRegions() {
        const obj = await db.select('id', 'names').from('regions');
        return obj;
    }

    async updateRegion(name, id) {
        const obj = await db('regions').update({'names': name, 'created_at': new Date() }).where({'id': id}).returning('*');
        return obj;
    }
    async create(name, country_id){
        const obj = await db.insert({ 'names': name, 'created_at': new Date() }).into("regions").where({'country_id': country_id}).returning("*");
        return obj;
    }

}

module.exports = new RegionDAO();