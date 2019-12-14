const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const pbkfd2Password = require('pbkdf2-password');
const hasher = pbkfd2Password(); 
const moment = require('moment'); 
const UserSchema = new Schema({

  id: {type:String, required:[true, "id is required"], unique: true},
  password: {type:String, required:true},
  email: {type: String , required:true},
  gender: {type: String, required:true},
  phoneNumber: {type: String, 
                validate: {
                  validator: (val) => {/\d{3]-\d{4}-\d{4}/.test(val)},
                  message: props => `${props.value} is not a valid phoneNumber`
                }
              },
  name: {type: String, required:true},
  joinDate: {type:Date, default: moment().format('YYYYMMDDHHmmss')},
  salt: {type:String, required: true}

});

const encryptoPassword = (password) => {
  return new Promise((resolve, reject) => {
    hasher({password:password}, (err, pass, salt, hash) => {
      if(err) reject(err); 
      resolve({hash, salt});
    })
  });
}

UserSchema.statics.create = async function (user) {
  const { hash, salt } = await encryptoPassword(user.password);
  const user1 = new this({
    id : user.id, 
    email : user.email, 
    password : hash, 
    phoneNumber : user.phoneNumber,
    gender : user.gender,
    name : user.name,
    isAdmin : false, 
    joinDate : moment().format('YYYYMMDDHHmmss'), 
    salt : salt 
  });
  return user1.save(); 
}

UserSchema.statics.updateUserInfo = function(user) {
  return UserSchema.updateOne({id: user.id}, {$set: {email:user.email, phoneNumber: user.phoneNumber, name: user.name}});
}

//find All User 
UserSchema.statics.findAllUser = function() {
  return this.find({}).sort({id:1}); 
}
//find one user by using id 
UserSchema.statics.findOneById = function(id) {
  return this.findOne({id:id}).exec(); 
}
//delete user 
UserSchema.statics.deleteUserById = function(id) {
  return this.deleteOne({id:id}); 
}

//verify the password of the user 
UserSchema.methods.verifyPassword = function(password, salt) {
  return new Promise((resolve, reject) => {
    hasher({password:password, salt: salt}, (err, pass, salt, hash) => {
      if(this.password === hash) resolve(true); 
      else reject(false); 
    });
  });
}
//assign admin 
UserSchema.methods.assignAdmin = function() {
  this.admin = true; 
  return this.save(); 
}

module.exports = mongoose.model('user', UserSchema);