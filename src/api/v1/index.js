const express = require('express'); 
const v1 = express(); 
const auth = require('./auth'); 
const exchange = require('./exchange');
const users = require('./users'); 

v1.use('/auth', auth);
v1.use('/exchange', exchange);
v1.use('/users', users); 

module.exports = v1;