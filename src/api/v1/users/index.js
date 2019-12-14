const router = require('express').Router(); 
const userController = require('./user.controller');
const authController = require('../auth/auth.controller');

//회원가입 
router.post('/', userController.signUp);
//정보수정
router.put('/:id', authController.checkToken, userController.updateUserInfo);
//회원탈퇴
router.delete('/:id', authController.checkToken, userController.deleteUserById);
//회원한명조회
router.get('/:id', userController.findOneUserById);
//모든회원조회 
router.get('/', userController.findAllUser); 

module.exports = router;