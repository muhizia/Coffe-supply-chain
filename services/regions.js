const RegionDAO = require('../dao/regions');

class RegionService {

    getRegionById(id) {
        return RegionDAO.getRegionById(id)
    }

}

module.exports = new RegionService();