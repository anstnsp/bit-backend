const User = require('../../../models/User');
const { getResponse, resultCode } = require('../../../resultCode'); 

//회원가입 
exports.signUp = async (req, res) => {
  console.log(` ### signup start ###`)
  const userData = req.body.data; 
  try {
    const userInfo = await User.findOneById(userData.id); 
    if(userInfo) throw resultCode.USER_EXIST; 
    await User.create(userData); 
    return getResponse(res, resultCode.SUCCESS); 
  } catch(error) {
    console.error(error); 
    if(error.code === 1) return getResponse(res, resultCode.USER_EXIST); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//회원정보수정 
exports.updateUserInfo = async (req, res) => {
  console.log( ` ### updateUserInfo start ###`)
  try {
    const userData = req.body.data; 
    const updateResult = await User.updateUserInfo(userData); 
    console.log(`updated data: ${updateResult}`)
    return getResponse(res, resultCode.SUCCESS);
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR)
  }
}

//회원탈퇴 
exports.deleteUserById = async (req, res) => {
  console.log(` ### delete user ### `);
  try {
    await User.deleteUserById(req.params.id); 
    return getResponse(res, resultCode.SUCCESS); 
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//전체회원조회 
exports.findAllUser = async (req, res) => {
  console.log(`### findAllUser ###`);
  try {
    const usersInfo = await User.findAllUser(); 
    return getResponse(res, resultCode.SUCCESS, usersInfo);
  } catch(error) {
    console.error(error);
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//회원조회 
exports.findOneUserById = async (req, res) => {
  console.log(` ### findOneUserById ### `)
  try {
    const userInfo = await User.findOneById(req.params.id);
    if(!userInfo) throw resultCode.NO_USER; 
    return getResponse(res, resultCode.SUCCESS, userInfo._doc); 
  } catch(error) {
    console.error(error); 
    if(error.code === 2) return getResponse(res, resultCode.NO_USER);
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

