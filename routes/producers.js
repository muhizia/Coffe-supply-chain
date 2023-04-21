var express = require('express');
var router = express.Router();
const Joi = require('joi');
const producerService = require('../services/producers');
const RegionService = require('../services/regions');
const { removeUndefined } = require('../util/validate')
const { authenticateToken } = require('../util/jwt')

router.post('/', authenticateToken, async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const producer = Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.string().required(),
        region_id: Joi.number().integer().required()
    });
    const { body } = req
    const { name, address, region_id } = body
    const result = producer.validate(body);
    const { error } = result;
    const valid = error == null;
    if (valid) {
        const is_region = await RegionService.getRegionById(region_id);
        if (is_region.length > 0) {
            const create_producer = await producerService.create(name, address, region_id)
            if (create_producer.length > 0) {
                return res.status(201).json({ success: true, producer: create_producer[0] })
            } else {
                return res.status(400).json({ success: false, message: 'An error occur please try again' })
            }
        } else {
            return res.status(400).json({ success: false, message: 'Region does not exist' })
        }
    } else {
        return res.status(400).json({ success: false, message: error.message })
    }
});


router.get('/:id', authenticateToken, async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const producer = Joi.object().keys({
        id: Joi.number().integer(),
    });
    const { params } = req
    const { id } = params
    const result = producer.validate(params);
    const { error } = result;
    const valid = error == null;
    if (!valid)
        return res.status(400).json({ success: false, message: error.message })

    const _producer = await producerService.getProducerById(id);
    if (_producer.length <= 0)
        return res.status(400).json({ success: false, message: 'Region does not exist' })

    return res.status(200).json({ success: true, producer: _producer[0] })
});

router.get('/', authenticateToken, async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const producers = await producerService.getProducers();
    if (producers) return res.status(200).json({ success: true, producers: producers })
    else res.status(500).json({ success: false, message: 'An internal error' })
});

router.put('/:id', authenticateToken, async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const producer = Joi.object().keys({
        id: Joi.number().integer().required(),
        name: Joi.string(),
        address: Joi.string(),
        region_id: Joi.number().integer()
    });
    const { body } = req
    const { id } = req.params
    const { name, address, region_id } = body
    const result = producer.validate({ id: id, name: name, address: address, region_id: region_id });
    const { error } = result;
    const valid = error == null;
    if (valid) {

        const is_producer = await producerService.getProducerById(id);
        if (is_producer.length <= 0) {
            return res.status(400).json({ success: false, message: 'Producer does not exist' })
        }
        // TODO: when region is undefined
        const updateData = removeUndefined({ names: name, addresses: address, region_id: region_id })
        if (updateData.length <= 0) {
            return res.status(400).json({ success: false, message: 'Prodide data to update' })
        }

        const is_region = await RegionService.getRegionById(region_id);
        if (is_region.length <= 0) {
            return res.status(400).json({ success: false, message: 'Region does not exist' })
        }

        const update_producer = await producerService.updateProducer(updateData, id)
        if (update_producer.length > 0) {
            return res.status(201).json({ success: true, producer: update_producer[0] })
        } else {
            return res.status(400).json({ success: false, message: 'An error occur please try again' })
        }


    } else {
        return res.status(400).json({ success: false, message: error.message })
    }
});

// router.delete('/producer:id', async function(req, res, next) {
//     const producer = Joi.object().keys({ 
//         name: Joi.string().required(),
//         address: Joi.string().required(), 
//         region_id: Joi.number().integer().required()
//     });
//     const { body } = req.body
//     const result = producer.validate(body);
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) { 
//         next(); 
//     } else {

//     }
// });

module.exports = router;
