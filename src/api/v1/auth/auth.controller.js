const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { getResponse, resultCode } = require('../../../resultCode'); 


exports.login = async (req, res) => {
  console.log(` ### login ###`); 
  const { id, password } = req.body; 
  try {
    //1.유저 조회해서 존재하는지 확인. 
    const userInfo = await User.findOneById(id); 
    if(!userInfo) return getResponse(res, resultCode.NO_USER); 
    //2.유저가 존재하면 비밀번호가 맞는지 확인. 
    await userInfo.verifyPassword(password, userInfo.salt); 
    //3.비밀번호가 맞다면 토큰생성 후 발급. 
    const token = await getToken(userInfo);
    res.cookie("token", token); 
    res.json({token : token});
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

exports.checkToken = async (req, res, next) => {
  console.log(` ### checkToken ###`)
  try {
    const token = req.cookies.token || req.headers['x-access-token'] || req.query.token;
    if(!token) return getResponse(res, resultCode.NO_TOKEN);
    const tokenData = await verifyToken(token);
    req.tokenData = tokenData; 
    next();
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR)
  }

}


//회원조회 
exports.findOneUserById = async (req, res) => {
  console.log(` ### findOneUserById ### `)
  try {
    const user = req.tokenData;
    const userInfo = await User.findOneById(user.id);
    if(!userInfo) throw resultCode.NO_USER; 
    return getResponse(res, resultCode.SUCCESS, userInfo._doc); 
  } catch(error) {
    console.error(error); 
    if(error.code === 2) return getResponse(res, resultCode.NO_USER);
    return getResponse(res, resultCode.ETC_ERROR);
  }
}



function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) reject(err);
      resolve(decoded);
    })
  })
}

function getToken (userInfo) {
  return new Promise((resolve, reject) => {
    const payload = {
      id: userInfo.id,
      name: userInfo.name, 
      email: userInfo.email
    };
    const JWTSECRET = process.env.JWT_SECRET; 
    const options = {
      expiresIn: '1d', 
      issuer: 'anstnsp', 
      subject: 'userInfo'
    };
    jwt.sign(payload, JWTSECRET, options, (err, token) => {
      if(err) reject(err); 
      else resolve(token); 
    })
  }) 
}