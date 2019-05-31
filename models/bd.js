var mongoose = require('mongoose');


var options = { connectTimeoutMS: 5000, useNewUrlParser: true }
mongoose.connect(
"mongodb+srv://dogo:dogo@cluster0-vjrqm.mongodb.net/Dogo?retryWrites=true",
  options,
  function(error){
    if (error) {
      console.error(error);
    } else {
      console.log('Your database is operational...')
    }
  }
);

module.exports = {
  mongoose: mongoose,
}