var express = require('express');
var router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const userService = require('../services/users');
const { authenticateToken, generateAccessToken } = require('../util/jwt')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express with Docker' });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ a: 1 }));
});

// TODO: status code
// https://www.semrush.com/blog/http-status-codes/?kw=&cmp=Africa_SRCH_DSA_Blog_EN&label=dsa_pagefeed&Network=g&Device=c&utm_content=622528804255&kwid=dsa-1754723155433&cmpid=18364843126&agpid=141057021083&BU=Core&extid=60114153143&adpos=&gclid=EAIaIQobChMIlfOj-9G0_gIV34KDBx1Uiw4xEAAYASAAEgIKUPD_BwE


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
    if(!valid) return res.status(400).json({success: false, message: error.message });

    const user = await userService.getUserByEmail(email);
    if(user.length <= 0) return res.status(400).json({success: false, message: 'No account associated with this email'});

    if (!await bcrypt.compare(password, user[0].password)) {
      return res.status(401).json({success: false, message: 'Incorrect password'})
    }
    delete user[0].password
    console.log(user[0])
    const token = generateAccessToken(user[0]);
    return res.status(202).json({success: true, token: token});
});

module.exports = router;
