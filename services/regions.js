const RegionDAO = require('../dao/regions');

class RegionService {

    getRegionById(id) {
        return RegionDAO.getRegionById(id);
    }

    getRegions() {
        return RegionDAO.getRegions();
    }

    updateRegion(name, id) {
        return RegionDAO.updateRegion(name, id);
    }
    create(name){
        return RegionDAO.create(name);
    }

}

module.exports = new RegionService();