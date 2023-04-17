const shipmentDAO = require('../dao/producers');
class shipmentService {
    getShipmentById(shipment_id) {
        return shipmentDAO.getShipmentById(shipment_id);
    }

    getShipments() {
        return shipmentDAO.getShipments();
    }

    updateShipment(status, shipment_id) {
        return shipmentDAO.updateShipment(status, shipment_id);
    }
    create(producer_id, supplier_id, quantity, status, shipment_id){
        return shipmentDAO.create(producer_id, supplier_id, quantity, status, shipment_id);
    }
    getLastShipmentID(){
        return shipmentDAO.getLastShipmentID(shipment_id);
    }
}

module.exports = new shipmentService();