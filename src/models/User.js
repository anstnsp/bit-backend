const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
 
const userSchema = new Schema({

  id: {type:String, required:[true, "id is required"], unique: true},
  password: {type:String, required:[true]},
  email: {type: String },
  gender: {type: String},
  phoneNumber: {type: String},
  name: {type: String}

});



module.exports = mongoose.model('user', userSchema);