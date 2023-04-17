var express = require('express');
var router = express.Router();
const Joi = require('joi');
const shipmentService = require('../services/shipments');
const producerService = require('../services/producers')
const supplierService = require('../services/suppliers')
const RegionDAO = require('../services/regions');
const { removeUndefined } = require('../util/validate')
// CRUD
router.post('/shipments', function(req, res, next) {
    
    const shipments = Joi.object().keys({ 
        shipment_id: Joi.string().required(),
        origin_id: Joi.number().integer().required(),
        destination_id: Joi.number().integer().required(),
        quantity: Joi.number().precision(2).required(),
        status: Joi.string().required()
    });
    const { body } = req
    const { shipment_id,
        origin_id,
        destination_id,
        quantity,
        status } = body
    const result = shipments.validate(body);
    const { error } = result; 
    const valid = error == null; 
    if (valid) {

        const producer = producerService.getProducerById(origin_id);
        if (producer.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'})
        }

        const supplier = supplierService.getSupplierById(destination_id);
        if (supplier.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'})
        }

        
        const create_shipments = shipmentService.create(origin_id, destination_id, quantity, status)
        if(create_shipments.length > 0){
            return res.status(201).json({success: true, shipments: create_shipments[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
        
    } else {
        return res.status(400).json({success: false, message: error})
    }
});


router.get('/shipments:shipment_id', function(req, res, next) {
    const shipments = Joi.object().keys({ 
        shipment_id: Joi.string().min(6).integer(),
    });
    const { params } = req
    const { shipment_id } = params
    const result = shipments.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const shipments = shipmentService.getShipmentsById(shipment_id);
        if(shipments.length > 0){
            return res.status(200).json({success: true, shipments: shipments[0]})
        }else{
            return res.status(400).json({success: false, message: 'Shipment does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

router.get('/shipments', function(req, res, next) {
    const shipments = shipmentService.getShipmentss();
    if (shipments) return res.status(200).json({success: true, shipments: shipments})
    else res.status(500).json({success: false, message: 'An internal error'})
});

router.put('/shipments:id', function(req, res, next) {
    const shipments = Joi.object().keys({ 
        shipment_id: Joi.string().required(),
        origin_id: Joi.number().integer().required(),
        destination_id: Joi.number().integer().required(),
        quantity: Joi.number().precision(2).required(),
        status: Joi.string().required()
    });
    const { body } = req.body
    const { shipment_id } = req.params
    const {
        origin_id,
        destination_id,
        quantity,
        status } = body
    const result = shipments.validate({shipment_id: shipment_id, origin_id: origin_id, destination_id: destination_id, quantity: quantity, status: status });
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        
        const is_shipments = shipmentService.getShipmentsById(id);
        if (is_shipments.length <= 0){
            return res.status(400).json({success: false, message: 'Shipments does not exist'})
        }

        const updateData = removeUndefined({shipment_id: shipment_id, origin_id: origin_id, destination_id: destination_id, quantity: quantity, status: status })
        if(updateData.length <= 0){
            return res.status(400).json({success: false, message: 'Prodide data to update'})
        }

        const producer = producerService.getProducerById(origin_id);
        if (producer.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'})
        }

        const supplier = supplierService.getSupplierById(destination_id);
        if (supplier.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'})
        }
        
        const update_shipments = shipmentService.updateShipments(updateData, id)
        if(update_shipments.length > 0){
            return res.status(201).json({success: true, shipments: create_shipments[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
            
        
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

// router.delete('/shipments:id', function(req, res, next) {
//     const shipments = Joi.object().keys({ 
//         name: Joi.string().required(),
//         address: Joi.string().required(), 
//         region_id: Joi.number().integer().required()
//     });
//     const { body } = req.body
//     const result = shipments.validate(body);
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) { 
//         next(); 
//     } else {
        
//     }
// });

module.exports = router;
