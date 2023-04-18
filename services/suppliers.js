const supplierDAO = require('../dao/suppliers');

class SupplierService {
    getSupplierById(id) {
        return supplierDAO.getSupplierById(id);
    }

    getSuppliers() {
        return supplierDAO.getSuppliers();
    }

    updateSupplier(supplier, id) {
        return supplierDAO.updateSupplier(supplier, id);
    }

    create(name, address, region_id){
        return supplierDAO.create(name, address, region_id);
    }
}

module.exports = new SupplierService();



