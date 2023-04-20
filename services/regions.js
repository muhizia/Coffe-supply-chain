const RegionDAO = require('../dao/regions');

class RegionService {

    getRegionById(id) {
        return RegionDAO.getRegionById(id);
    }

    getRegionByCountry(id) {
        return RegionDAO.getRegionByCountry(id);
    }

    getRegions() {
        return RegionDAO.getRegions();
    }

    updateRegion(name, id) {
        return RegionDAO.updateRegion(name, id);
    }
    create(name, country_id){
        return RegionDAO.create(name, country_id);
    }

}

module.exports = new RegionService();