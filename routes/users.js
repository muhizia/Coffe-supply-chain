var express = require('express');
var router = express.Router();
const Joi = require('joi');
const userService = require('../services/users');
const { removeUndefined, getHash } = require('../util/validate')
// CRUD
router.post('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const users = Joi.object().keys({ 
        firstname: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        re_type: Joi.string().required(),
    });
    const { body } = req
    const { firstname, lastname, email, password, re_type } = body
    const result = users.validate(body);
    const { error } = result; 
    const valid = error == null;

    if (!valid) { 
        return res.status(400).json({success: false, message: error.message})
    }

    const email_exists = await userService.getUserByEmail(email);
    if(email_exists.length > 0){
        return res.status(400).json({success: false, message: 'Email already exists'})
    }

    const hash = await getHash(password)
    var user_detail = removeUndefined({firstname: firstname, lastname: lastname, email: email, password: hash})
    if(user_detail.length <= 0){
        return res.status(400).json({success: false, message: 'Email, and paassword are mandatory!'})
    }

    if(password !== re_type){
        return res.status(400).json({success: false, message: 'Password and re-type password must much!'})
    }

    user_detail['created_at'] = new Date();
    console.log(user_detail)

    const create_users = await userService.create(user_detail)
    if(create_users.length <= 0){
        return res.status(400).json({success: false, message: 'An error occured please try again'})
    }
    delete create_users[0]['password'];
    return res.status(201).json({success: true, status: 'OK'})
});


router.get('/:id', async function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  const users = Joi.object().keys({ 
      id: Joi.number().integer().required()
  });
  const { params } = req
  const { id } = params
  const result = users.validate(params);
  const { error } = result; 
  const valid = error == null; 
  if (valid) { 
      const users = await userService.getUserById(id);
      if(users.length > 0){
          return res.status(200).json({success: true, users: users[0]})
      }else{
          return res.status(400).json({success: false, message: 'User does not exist'})
      }
  } else {
      return res.status(400).json({success: false, message: error.message})
  }
});

router.get('/', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const users = await userService.getUsers();
    if (users) return res.status(200).json({success: true, users: users})
    else res.status(500).json({success: false, message: 'An internal error'})
});

// if (!await bcrypt.compare(old_password, userExist[0].password))

// router.put('/:id', async function(req, res, next) {
//     res.setHeader('Content-Type', 'application/json');
//     const users = Joi.object().keys({
//         id: Joi.number().integer().required(),
//         name: Joi.string(),
//         address: Joi.string(), 
//         region_id: Joi.number().integer()
//     });
//     const { body } = req
//     const { id } = req.params
//     const { name, address, region_id } = body
//     const result = users.validate({id: id, name: name, address: address, region_id: region_id});
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) {
        
//         const is_users = await userService.getUserById(id);
//         if (is_users.length <= 0){
//             return res.status(400).json({success: false, message: 'Users does not exist'})
//         }

//         const updateData = removeUndefined({names: name, addresses: address, region_id: region_id})
//         if(updateData.length <= 0){
//             return res.status(400).json({success: false, message: 'Prodide data to update'})
//         }

//         const is_region = await RegionService.getRegionById(region_id);
//         if(is_region.length <= 0){
//             return res.status(400).json({success: false, message: 'Region does not exist'})
//         }
        
//         const update_users = await userService.updateUser(updateData, id)
//         if(update_users.length > 0){
//             return res.status(201).json({success: true, users: update_users[0]})
//         }else{
//             return res.status(400).json({success: false, message: 'An error occur please try again'})
//         }
            
        
//     } else {
//         return res.status(400).json({success: false, message: error.message})
//     }
// });

// router.delete('/users:id', async function(req, res, next) {
//     const users = Joi.object().keys({ 
//         name: Joi.string().required(),
//         address: Joi.string().required(), 
//         region_id: Joi.number().integer().required()
//     });
//     const { body } = req.body
//     const result = users.validate(body);
//     const { error } = result; 
//     const valid = error == null; 
//     if (valid) { 
//         next(); 
//     } else {
        
//     }
// });

module.exports = router;
