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

    create(name, region, address){
        return producerDAO.create(name, region, address);
    }
}

module.exports = new ProducerService();



