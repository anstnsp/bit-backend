exports.resultCode = {
    SUCCESS: {status: 200, code: 0, message: 'OK'},
    USER_EXIST: {status: 200, code: 1, message: '해당 회원은 이미 존재합니다.'},
    NO_USER: {status: 200, code: 2, message: '해당 회원은 존재하지 않습니다.'},
    NO_TOKEN:  {status: 200, code: 3, message: '토큰이 존재 하지않습니다.'},
    NO_BOARD: {status: 200, code: 4, message: '해당 게시물은 존재하지 않습니다.'},
    ETC_ERROR:  {status: 200, code: 999, message: '알수 없는 에러'}
    
};

exports.getResponse = (response, resultCode, data) => {
    let resultObj;
    let commonObj = {
        code: resultCode.code,
        msg: resultCode.message
    };

    if (data) {
        // resultObj = Object.assign({}, commonObj, data);
        resultObj = Object.assign({}, data);
    } else {
        resultObj = commonObj;
    }

    return response.status(resultCode.status).json(resultObj);
};

