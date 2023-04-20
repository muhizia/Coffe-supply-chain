const db = require('../db/db');
class shipmentDAO {
    async getShipmentById(shipment_id) {

        const obj = await db({ cs: 'shipments', p: 'producers', csup: 'suppliers'}).select({'ID': 'cs.id', 'shipment_ID': 'cs.shipment_id', 'origin': 'p.names', 'destination': 'csup.names', 'quantities': 'cs.quantities', 'status': 'cs.status'}).whereRaw('?? = ??', ['cs.origin_id', 'p.id']).whereRaw('?? = ??', ['cs.destination_id', 'csup.id']).where({'cs.shipment_id': shipment_id});
        return obj;
    }

    async getShipments() {
        const obj = await db({ cs: 'shipments', p: 'producers', csup: 'suppliers'}).select({'ID': 'cs.id', 'shipment_ID': 'cs.shipment_id', 'origin': 'p.names', 'destination': 'csup.names', 'quantities': 'cs.quantities', 'status': 'cs.status'}).whereRaw('?? = ??', ['cs.origin_id', 'p.id']).whereRaw('?? = ??', ['cs.destination_id', 'csup.id']);
        return obj;
    }

    async updateShipment(status, shipment_id) {
        const obj = await db('shipments').update({'status': status}).where({'shipment_id': shipment_id}).returning('*');
        return obj;
    }
    async create(producer_id, supplier_id, quantity, status, shipment_id){
        const obj = await db.insert({ shipment_id: shipment_id, origin_id: producer_id, destination_id: supplier_id, quantities: quantity, status: status, created_at: new Date() }).into("shipments").returning("*");
        return obj;
    }
    async getLastShipmentID(){
        const obj = await db.select('shipment_id').from('shipments').orderBy('shipment_id', 'desc').limit(1);
        return obj;
    }
}

module.exports = new shipmentDAO();