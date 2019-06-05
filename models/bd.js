var mongoose = require('mongoose');


var options = { connectTimeoutMS: 5000, useNewUrlParser: true }
mongoose.connect(
"mongodb+srv://dogo:dogo@cluster0-zwqkq.mongodb.net/DoGo?retryWrites=true&w=majority",
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