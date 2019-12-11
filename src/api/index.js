const express = require('express'); 
const api = express(); 

api.use('/v1', require('./v1'));

module.exports = api;
