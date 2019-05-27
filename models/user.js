var mongoose = require('mongoose');

var DogSchema = mongoose.Schema(
  {
    nom:String,
    gender: Number,
    image:String
  }
)


var UserSchema = mongoose.Schema({
    username : String,
    email: String,
    password: String,
    description: String,
    Dog:[DogSchema]
   });

module.exports = mongoose.model('users', UserSchema);