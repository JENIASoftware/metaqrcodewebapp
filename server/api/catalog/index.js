'use strict';

var express = require('express');
var controller = require('./catalog.controller');

var router = express.Router();

router.post('/search', controller.index);
router.post('/upload',function(req,res){
    res.send("ok");
});
module.exports = router;