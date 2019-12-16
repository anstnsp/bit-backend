const Board = require('../../../models/Board');
const {getResponse, resultCode } = require('../../../resultCode');

//게시물 작성 
exports.writeBoard = async (req, res) => {
  console.log(`### writeBoard ###`);
  try {
    const boardData = req.body; 
    await Board.create(boardData.title, boardData.contents, boardData.writer); 
    return getResponse(res, resultCode.SUCCESS); 
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//전체 게시물 보기 
exports.findAllBoards = async (req, res) => {
  console.log(` ### findAllBoards ###`);
  try {
    const boardList = await Board.findAllBoards(); 
    return getResponse(res, resultCode.SUCCESS, boardList); 
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//게시물정보보기 
exports.readBoardInfo = async (req, res) => {
  console.log(`### readBoardInfo ###`);
  try {
    const boardInfo = await Board.readBoardInfo(req.params.boardId);
    if(!boardInfo) return getResponse(res, resultCode.NO_BOARD);
    return getResponse(res, resultCode.SUCCESS, boardInfo._doc);
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//게시글 수정 
exports.updateBoardInfo = async (req, res) => {
  console.log(` ### updateBoardInfo ###`);
  try {
    const boardData = req.body.data;
    await Board.updateBoardInfo(boardData);
    return getResponse(res, resultCode.SUCCESS);
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}

//게시글 삭제 
exports.deleteBoard = async (req, res) => {
  console.log(` ### deleteBoard ###`);
  try {
    await Board.deleteBoard(req.params.boardId);
    return getResponse(res, resultCode.ETC_ERROR);
  } catch(error) {
    console.error(error); 
    return getResponse(res, resultCode.ETC_ERROR);
  }
}


