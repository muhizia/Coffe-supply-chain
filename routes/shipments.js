var express = require('express');
var router = express.Router();
const Joi = require('joi');
const shipmentService = require('../services/shipments');
const producerService = require('../services/producers')
const supplierService = require('../services/suppliers')
const { removeUndefined, generateShipmentID } = require('../util/validate')
const {authenticateToken} = require('../util/jwt')
// CRUD
router.post('/', authenticateToken, async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const shipments = Joi.object().keys({ 
        origin_id: Joi.number().integer().required(),
        destination_id: Joi.number().integer().required(),
        quantity: Joi.number().precision(2).required(),
        status: Joi.string().required()
    });
    const { body } = req
    const {
        origin_id,
        destination_id,
        quantity,
        status } = body
    const result = shipments.validate(body);
    const { error } = result; 
    const valid = error == null; 
    if (valid) {

        const producer = await producerService.getProducerById(origin_id);
        if (producer.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'});
        }

        const supplier = await supplierService.getSupplierById(destination_id);
        if (supplier.length <= 0){
            return res.status(400).json({success: false, message: 'Destination does not exist'});
        }
        if (quantity <= 0){
            return res.status(400).json({success: false, message: 'Quantity must be valid'})
        }
        const last_ID = await shipmentService.getLastShipmentID();

        const shipment_id = generateShipmentID(last_ID[0]);
        const create_shipments = await shipmentService.create(origin_id, destination_id, quantity, status, shipment_id);
        
        if(create_shipments.length > 0){
            return res.status(201).json({success: true, shipments: create_shipments[0]});
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'});
        }
        
    } else {
        return res.status(400).json({success: false, message: error.message});
    }
});


router.get('/:shipment_id', authenticateToken, async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const shipments = Joi.object().keys({ 
        shipment_id: Joi.string().min(6).required(),
    });
    const { params } = req
    const { shipment_id } = params
    const result = shipments.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (!valid) return res.status(400).json({success: false, message: error.message.message});
    
    const _shipments = await shipmentService.getShipmentById(shipment_id);
    if(_shipments.length <= 0) return res.status(400).json({success: false, message: 'Shipment does not exist'});
    
    return res.status(200).json({success: true, shipments: _shipments[0]});
    
});

router.get('/details/:shipment_id', authenticateToken, async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const shipments = Joi.object().keys({ 
        shipment_id: Joi.string().min(6).required(),
    });
    const { params } = req
    const { shipment_id } = params
    const result = shipments.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (!valid) return res.status(400).json({success: false, message: error.message});
    
    const _shipments = await shipmentService.getShipmentDetailsById(shipment_id);
    if(_shipments.length <= 0) return res.status(400).json({success: false, message: 'Shipment details does not exist'});
    
    return res.status(200).json({success: true, shipments: _shipments});
    
});

router.get('/', authenticateToken, async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const shipments = await shipmentService.getShipments();
    if (shipments) return res.status(200).json({success: true, shipments: shipments});
    else res.status(500).json({success: false, message: 'An internal error'});
});

router.put('/:id', authenticateToken, async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
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
        
        const is_shipments = await shipmentService.getShipmentById(id);
        if (is_shipments.length <= 0){
            return res.status(400).json({success: false, message: 'Shipments does not exist'})
        }

        const updateData = removeUndefined({shipment_id: shipment_id, origin_id: origin_id, destination_id: destination_id, quantity: quantity, status: status })
        if(updateData.length <= 0){
            return res.status(400).json({success: false, message: 'Prodide data to update'})
        }

        const producer = await producerService.getProducerById(origin_id);
        if (producer.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'})
        }

        const supplier = await supplierService.getSupplierById(destination_id);
        if (supplier.length <= 0){
            return res.status(400).json({success: false, message: 'Origin does not exist'})
        }
        
        const update_shipments = await shipmentService.updateShipment(updateData, id)
        if(update_shipments.length > 0){
            return res.status(201).json({success: true, shipments: update_shipments[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
            
        
    } else {
        return res.status(400).json({success: false, message: error.message})
    }
});

// router.delete('/shipments:id', async function(req, res, next) {
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
