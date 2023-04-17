var express = require('express');
var router = express.Router();
const Joi = require('joi');
const CountryService = require('../services/countries');

// CRUD
router.post('/',  async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const country = Joi.object().keys({ 
        name: Joi.string().required(),
    });
    const { body } = req
    const { name } = body
    const result = country.validate(body);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const create_country =  await CountryService.create(name)
        if(create_country.length > 0){
            return res.status(201).json({success: true, country: create_country[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});


router.get('/:id',  async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const country = Joi.object().keys({ 
        id: Joi.number().integer(),
    });
    const { params } = req
    const { id } = params
    const result = country.validate(params);
    const { error } = result; 
    const valid = error == null; 
    if (valid) { 
        const country =  await CountryService.getCountryById(id);
        if(country.length > 0){
            return res.status(200).json({success: true, country: country[0]})
        }else{
            return res.status(400).json({success: false, message: 'Country does not exist'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

router.get('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const countries = await CountryService.getCountrys();
    if (countries) return res.status(200).json({success: true, countries: countries})
    else res.status(500).json({success: false, message: 'An internal error'})
});

router.put('/:id',  async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const country = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string()
    });
    const { body } = req
    const { id } = req.params
    const { name } = body
    const result = country.validate({id: id, name: name});
    const { error } = result; 
    const valid = error == null; 
    if (valid) {
        const is_country =  await CountryService.getCountryById(id);
        if (is_country.length <= 0){
            return res.status(400).json({success: false, message: 'Country does not exist'})
        }

        if(!name){
            return res.status(400).json({success: false, message: 'Prodide name to update'})
        }

        const update_country =  await CountryService.updateCountry(name, id)
        if(update_country.length > 0){
            return res.status(201).json({success: true, country: update_country[0]})
        }else{
            return res.status(400).json({success: false, message: 'An error occur please try again'})
        }
    } else {
        return res.status(400).json({success: false, message: error})
    }
});

// router.delete('/country:id', async function(req, res, next) {
//     const country = Joi.object().keys({ 
//         name: Joi.string().required(),
//         address: Joi.string().required(), 
//         region_id: Joi.number().integer().required()
//     });
//     const { body } = req.body
//     const result = country.validate(body);
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) { 
//         next(); 
//     } else {
        
//     }
// });

module.exports = router;
