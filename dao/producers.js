const db = require('../db/db');
class ProducerDAO {
    async getProducerById(id) {

        const obj = await db({ c: 'countries', r: 'regions', p: 'producers'}).select({'ID': 'p.id', 'Name': 'p.names', 'Country': 'c.names', 'Region': 'r.names', 'Address': 'p.addresses'}).whereRaw('?? = ??', ['p.region_id', 'r.id']).whereRaw('?? = ??', ['r.country_id', 'c.id']).where({'p.id': id});
        return obj;
    }

    async getProducers() {

        const obj = await db({ c: 'countries', r: 'regions', p: 'producers'}).select({'ID': 'p.id', 'Name': 'p.names', 'Country': 'c.names', 'Region': 'r.names', 'Address': 'p.addresses'}).whereRaw('?? = ??', ['p.region_id', 'r.id']).whereRaw('?? = ??', ['r.country_id', 'c.id']);
        return obj;
    }

    async updateProducer(producer, id) {
        const obj = await db('producers').update(producer).where({'id': id}).returning('*');
        return obj;
    }
    async create(name, address, region_id){
        const obj = await db.insert({ names: name, region_id: region_id, addresses: address, created_at: new Date() }).into("producers").returning("*");
        return obj;
    }
}

module.exports = new ProducerDAO();