const router = require('express').Router(); 
const authController = require('./auth.controller');
const userController = require('../users/user.controller');


router.post('/login', authController.login); 
router.get('/:id', authController.checkToken, authController.findOneUserById); 


module.exports = router;