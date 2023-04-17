const CountryDAO = require('../dao/countries');

class CountryService {

    getCountryById(id) {
        return CountryDAO.getCountryById(id);
    }

    getCountrys() {
        return CountryDAO.getCountries();
    }

    updateCountry(name, id) {
        return CountryDAO.updateCountry(name, id);
    }
    create(name){
        return CountryDAO.create(name);
    }

}

module.exports = new CountryService();