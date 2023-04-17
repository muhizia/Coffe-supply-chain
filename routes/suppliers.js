var express = require('express');
var router = express.Router();
const Joi = require('joi');
const suppliersService = require('../services/supplierss');
const RegionDAO = require('../services/regions');
const { removeUndefined } = require('../util/validate')
// CRUD
router.post('/suppliers', function(req, res, next) {
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
        const is_region = RegionDAO.getRegionById(region_id);
        if(is_region.length > 0){
            const create_suppliers = suppliersService.create(name, address, region_id)
            if(create_suppliers.length > 0){
                return res.status(201).json({success: true, suppliers: create_suppliers[0]})
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


router.get('/suppliers:id', function(req, res, next) {
    const suppliers = Joi.object().keys({ 
        id: Joi.number().integer(),
    });
    const { params } = req
    const { id } = params
    const result = suppliers.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const suppliers = suppliersService.getSuppliersById(id);
        if(suppliers.length > 0){
            
            return res.status(200).json({success: true, suppliers: suppliers[0]})
            
        }else{
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

router.get('/suppliers', function(req, res, next) {
    const supplierss = suppliersService.getSupplierss();
    if (supplierss) return res.status(200).json({success: true, supplierss: supplierss})
    else res.status(500).json({success: false, message: 'An internal error'})
});

router.put('/suppliers:id', function(req, res, next) {
    const suppliers = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string(),
        address: Joi.string(), 
        region_id: Joi.number().integer()
    });
    const { body } = req.body
    const { id } = req.params
    const { name, address, region_id } = body
    const result = suppliers.validate({id: id, name: name, address: address, region_id: region_id});
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        
        const is_suppliers = suppliersService.getSuppliersById(id);
        if (is_suppliers.length <= 0){
            return res.status(400).json({success: false, message: 'Suppliers does not exist'})
        }

        const updateData = removeUndefined({name: name, address: address, region_id: region_id})
        if(updateData.length <= 0){
            return res.status(400).json({success: false, message: 'Prodide data to update'})
        }

        const is_region = RegionDAO.getRegionById(region_id);
        if(is_region.length <= 0){
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
        
        const update_suppliers = suppliersService.updateSuppliers(updateData, id)
        if(update_suppliers.length > 0){
            return res.status(201).json({success: true, suppliers: create_suppliers[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
            
        
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

// router.delete('/suppliers:id', function(req, res, next) {
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
