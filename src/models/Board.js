const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const commentSchema = new Schema({
  contents: String, 
  writer: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  comment_date: {type: Date, default: Date.now}
});
const boardSchema = new Schema({
  title: String, 
  contents: String, 
  writer:  {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
  date: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  deleted: {type:Boolean, default: false},
  comments: [commentSchema],
  count: {type:Number, default: 0}
});

//게시글 등록 
boardSchema.statics.create = async function(title, contents, writer) {
  const board = new this({
    title: title,
    contents: contents,
    writer: writer
  });
  return board.save(); 
}

//update board 
boardSchema.statics.updateBoardInfo = function(board) {
  return board.updateOne({_id: board.id}, {$set: {title: board.title, contents: board.contents, updated: board.updated}});
}

//findallboard
boardSchema.statics.findAllBoards = function() {
  return this.find({});
}

//게시글 정보보기 
boardSchema.statics.readBoardInfo = function(boardId) {
  return this.findOne({_id: boardId}).exec(); 
}

//delete board 
boardSchema.statics.deleteBoard = function(boardId) {
  return this.deleteOne({_id: boardId});
}

module.exports = mongoose.model('board', boardSchema);