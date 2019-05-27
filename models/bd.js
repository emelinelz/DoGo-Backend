var mongoose = require('mongoose');


var options = { connectTimeoutMS: 5000, useNewUrlParser: true }
mongoose.connect(
"mongodb+srv://Avila:2222@avilaai-tq9n5.mongodb.net/dogo?retryWrites=true",
  options,
  function(error){

  }
);