const db = require('../db/db');

class RegionDAO {

    async getRegionById(id) {
        const obj = await db.select('names').from('regions').where({ 'id': id });
        return obj;
    }

}

module.exports = new RegionDAO();
