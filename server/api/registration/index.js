'use strict';

var express = require('express');
var controller = require('./registration.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/confirm',function(req,res){
    res.send({returnCode:0});
    //res.send({returnCode:-1,reason:'Invalid code'});
});
module.exports = router;