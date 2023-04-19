var express = require('express');
var router = express.Router();
const Joi = require('joi');
const supplierService = require('../services/suppliers');
const RegionService = require('../services/regions');
const { removeUndefined } = require('../util/validate')
const {authenticateToken} = require('../util/jwt')

router.post('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const suppliers = Joi.object().keys({ 
        name: Joi.string().required(),
        address: Joi.string().required(), 
        region_id: Joi.number().integer().required()
    });
    const { body } = req
    const { name, address, region_id } = body
    const result = suppliers.validate(body);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const is_region = await RegionService.getRegionById(region_id);
        if(is_region.length > 0){
            const create_suppliers = await supplierService.create(name, address, region_id)
            if(create_suppliers.length > 0){
                return res.status(201).json({success: true, suppliers: create_suppliers[0]})
            }else{
                return res.status(400).json({success: false, message: 'An error occur please try again'})
            }
        }else{
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error.message})
    }
});


router.get('/:id', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const suppliers = Joi.object().keys({ 
        id: Joi.number().integer(),
    });
    const { params } = req
    const { id } = params
    const result = suppliers.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const suppliers = await supplierService.getSupplierById(id);
        if(suppliers.length > 0){
            
            return res.status(200).json({success: true, suppliers: suppliers[0]})
            
        }else{
            return res.status(400).json({success: false, message: 'Supplier does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error.message})
    }
});

router.get('/', authenticateToken, async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const suppliers = await supplierService.getSuppliers();
    if (suppliers) return res.status(200).json({success: true, suppliers: suppliers})
    else res.status(500).json({success: false, message: 'An internal error'})
});

router.put('/:id', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const suppliers = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string(),
        address: Joi.string(), 
        region_id: Joi.number().integer()
    });
    const { body } = req
    const { id } = req.params
    const { name, address, region_id } = body
    const result = suppliers.validate({id: id, name: name, address: address, region_id: region_id});
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        
        const is_suppliers = await supplierService.getSupplierById(id);
        if (is_suppliers.length <= 0){
            return res.status(400).json({success: false, message: 'Suppliers does not exist'})
        }

        const updateData = removeUndefined({names: name, addresses: address, region_id: region_id})
        if(updateData.length <= 0){
            return res.status(400).json({success: false, message: 'Prodide data to update'})
        }

        const is_region = await RegionService.getRegionById(region_id);
        if(is_region.length <= 0){
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
        
        const update_suppliers = await supplierService.updateSupplier(updateData, id)
        if(update_suppliers.length > 0){
            return res.status(201).json({success: true, suppliers: update_suppliers[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
            
        
    } else {
        return res.status(400).json({success: false, message: error.message})
    }
});

// router.delete('/suppliers:id', async function(req, res, next) {
//     const suppliers = Joi.object().keys({ 
//         name: Joi.string().required(),
//         address: Joi.string().required(), 
//         region_id: Joi.number().integer().required()
//     });
//     const { body } = req.body
//     const result = suppliers.validate(body);
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) { 
//         next(); 
//     } else {
        
//     }
// });

module.exports = router;
