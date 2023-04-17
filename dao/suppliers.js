const db = require('../db/db');
class SupplierDAO {
    async getSupplierById(id) {

        const obj = await db({ c: 'countries', r: 'regions', cs: 'suppliers'}).select({'ID': 'cs.id', 'Name': 'cs.names', 'Country': 'c.names', 'Region': 'r.names', 'Address': 'cs.addresses'}).whereRaw('?? = ??', ['cs.region_id', 'r.id']).whereRaw('?? = ??', ['r.country_id', 'c.id']).where({'cs.id': id});
        return obj;
    }

    async getSuppliers() {

        const obj = await db({ c: 'countries', r: 'regions', cs: 'suppliers'}).select({'ID': 'cs.id', 'Name': 'cs.names', 'Country': 'c.names', 'Region': 'r.names', 'Address': 'cs.addresses'}).whereRaw('?? = ??', ['cs.region_id', 'r.id']).whereRaw('?? = ??', ['r.country_id', 'c.id']);
        return obj;
    }

    async updateSupplier(supplier, id) {
        const obj = await db('suppliers').update(supplier).where({'id': id}).returning('*');
        return obj;
    }
    async create(name, region, address){
        const obj = await db.insert({ names: name, region_id: region, addresses: address, created_at: new Date() }).into("suppliers").returning('id');
        return obj;
    }
}

module.exports = new SupplierDAO();