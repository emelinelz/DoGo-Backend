const bd = require('./bd');

var DogSchema = bd.mongoose.Schema(
  {
    nom:String,
    gender: String,
    image:String
  }
)


var UserSchema = bd.mongoose.Schema({
    username : String,
    email: String,
    password: String,
    description: String,
    token: String,
    salt: String,
    dog1:String,
    dog1gender:String,
    avatar:String,
    dog:[DogSchema],
   
});



var userModel= bd.mongoose.model('users', UserSchema);
module.exports = userModel

