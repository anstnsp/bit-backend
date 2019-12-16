const User = require('../../../models/User');
const { getResponse, resultCode } = require('../../../resultCode'); 

//회원가입 
exports.signUp = async (req, res) => {
  console.log(` ### signup start ###`)
  const userData = req.body.data; 
  try {
    const userInfo = await User.findOneById(userData.id); 
    if(userInfo) return getResponse(res, resultCode.USER_EXIST);
    await User.create(userData); 
    return getResponse(res, resultCode.SUCCESS); 
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//회원정보수정 
exports.updateUserInfo = async (req, res) => {
  console.log( ` ### updateUserInfo start ###`)
  try {
    const user = req.tokenData;
    const updateResult = await User.updateUserInfo(user); 
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
    const user = req.tokenData;
    await User.deleteUserById(user.id); 
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
    const user = req.tokenData;
    const userInfo = await User.findOneById(user.id);
    if(!userInfo) return getResponse(res, resultCode.NO_USER);  
    return getResponse(res, resultCode.SUCCESS, userInfo._doc); 
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

