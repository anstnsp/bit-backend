const router = require('express').Router();
const boardController = require('./board.controller');

//게시물 쓰기 
router.post('/', boardController.writeBoard); 
//게시글 내용 보기 
router.get('/:boardId', boardController.readBoardInfo); 
//전체게시판 불러오기 
router.get('/', boardController.findAllBoards);
//게시글 수정 
router.put('/:boardId', boardController.updateBoardInfo); 
//게시글 삭제 
router.delete('/:boardId', boardController.deleteBoard); 


module.exports = router; 