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

    create(name, region, address){
        return supplierDAO.create(name, region, address);
    }
}

module.exports = new SupplierService();



