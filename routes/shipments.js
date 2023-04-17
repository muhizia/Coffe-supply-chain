var express = require('express');
var router = express.Router();
const Joi = require('joi');
const shipmentsService = require('../services/shipmentss');
const RegionDAO = require('../services/regions');
const { removeUndefined } = require('../util/validate')
// CRUD
router.post('/shipments', function(req, res, next) {
    const shipments = Joi.object().keys({ 
        name: Joi.string().required(),
        address: Joi.string().required(), 
        region_id: Joi.number().integer().required()
    });
    const { body } = req
    const { name, address, region_id } = body
    const result = shipments.validate(body);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const is_region = RegionDAO.getRegionById(region_id);
        if(is_region.length > 0){
            const create_shipments = shipmentsService.create(name, address, region_id)
            if(create_shipments.length > 0){
                return res.status(201).json({success: true, shipments: create_shipments[0]})
            }else{
                return res.status(400).json({success: false, message: 'An error occur please try again'})
            }
        }else{
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});


router.get('/shipments:id', function(req, res, next) {
    const shipments = Joi.object().keys({ 
        id: Joi.number().integer(),
    });
    const { params } = req
    const { id } = params
    const result = shipments.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const shipments = shipmentsService.getShipmentsById(id);
        if(shipments.length > 0){
            
            return res.status(200).json({success: true, shipments: shipments[0]})
            
        }else{
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

router.get('/shipments', function(req, res, next) {
    const shipmentss = shipmentsService.getShipmentss();
    if (shipmentss) return res.status(200).json({success: true, shipmentss: shipmentss})
    else res.status(500).json({success: false, message: 'An internal error'})
});

router.put('/shipments:id', function(req, res, next) {
    const shipments = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string(),
        address: Joi.string(), 
        region_id: Joi.number().integer()
    });
    const { body } = req.body
    const { id } = req.params
    const { name, address, region_id } = body
    const result = shipments.validate({id: id, name: name, address: address, region_id: region_id});
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        
        const is_shipments = shipmentsService.getShipmentsById(id);
        if (is_shipments.length <= 0){
            return res.status(400).json({success: false, message: 'Shipments does not exist'})
        }

        const updateData = removeUndefined({name: name, address: address, region_id: region_id})
        if(updateData.length <= 0){
            return res.status(400).json({success: false, message: 'Prodide data to update'})
        }

        const is_region = RegionDAO.getRegionById(region_id);
        if(is_region.length <= 0){
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
        
        const update_shipments = shipmentsService.updateShipments(updateData, id)
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
