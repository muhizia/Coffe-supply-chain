var express = require('express');
var router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const userService = require('../services/users');
const { generateAccessToken } = require('../util/jwt')


router.post('/login', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const users = Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { body } = req;
    const { email, password } = body;
    const result = users.validate(body);
    const { error } = result; 
    const valid = error == null;

    if(!valid) return res.status(404).json({success: false, message: error.message });

    const user = await userService.getUserByEmail(email);
    if(user.length <= 0) return res.status(404).json({success: false, message: 'No account associated with this email'});

    if (!await bcrypt.compare(password, user[0].password)) {
      return res.status(404).json({success: false, message: 'Incorrect password'})
    }

    delete user[0].password
    const token = generateAccessToken(user[0]);
    return res.status(200).json({success: true, token: token});
});

module.exports = router;
