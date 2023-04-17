var express = require('express');
var router = express.Router();
const Joi = require('joi');
const countryService = require('../services/countries');
const regionService = require('../services/regions');
const { removeUndefined } = require('../util/validate')
// CRUD
router.post('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const region = Joi.object().keys({ 
        country_id: Joi.number().integer().required(),
        name: Joi.string().required(),
    });
    const { body } = req
    const { country_id, name } = body
    const result = region.validate(body);
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        const create_region = await regionService.create(name, country_id)
        if(create_region.length > 0){
            return res.status(201).json({success: true, region: create_region[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});


router.get('/:id', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const region = Joi.object().keys({ 
        id: Joi.number().integer(),
    });
    const { params } = req
    const { id } = params
    const result = region.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const region = regionService.getRegionById(id);
        if(region.length > 0){
            return res.status(200).json({success: true, region: region[0]})
        }else{
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const regions = regionService.getRegions();
    if (regions) return res.status(200).json({success: true, regions: regions})
    else res.status(500).json({success: false, message: 'An internal error'})
});

router.put('/:id', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const region = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string()
    });
    const { body } = req.body
    const { id } = req.params
    const { name } = body
    const result = region.validate({id: id, name: name});
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        const is_region = regionService.getCountryById(id);
        if (is_region.length <= 0){
            return res.status(400).json({success: false, message: 'Region does not exist'})
        }
        
        const is_country = countryService.getCountryById(country_id);
        if(is_country.length <= 0 ){
            return res.status(400).json({success: false, message: 'Country does not exist'})
        }

        if (!name){
            return res.status(400).json({success: false, message: 'Prodide name to update'})
        }
        const update_region = regionService.updateCountry(name, country_id, id)
        if(update_region.length <= 0){
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
        
        return res.status(201).json({success: true, region: create_region[0]})
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

// router.delete('/region:id', function(req, res, next) {
//     const region = Joi.object().keys({ 
//         name: Joi.string().required(),
//         address: Joi.string().required(), 
//         region_id: Joi.number().integer().required()
//     });
//     const { body } = req.body
//     const result = region.validate(body);
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) { 
//         next(); 
//     } else {
        
//     }
// });

module.exports = router;
