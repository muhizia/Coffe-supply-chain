const producerDAO = require('../dao/producers');

class ProducerService {
    getProducerById(id) {
        return producerDAO.getProducerById(id);
    }

    getProducers() {
        return producerDAO.getProducers();
    }

    updateProducer(producer, id) {
        return producerDAO.updateProducer(producer, id);
    }

    create(name, address, region_id){
        return producerDAO.create(name, address, region_id);
    }
}

module.exports = new ProducerService();



