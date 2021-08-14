const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({
   username: String, 
   hash: String, 
   salt: String 
})


module.exports = mongoose.model('User', UserSchema)