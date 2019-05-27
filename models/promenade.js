var mongoose = require('mongoose');


var PromenadeSchema = mongoose.Schema({
    userId : String,
    userName: String,
    ville:String,
    adress:String,
    date: Date,
    duree: Number,
    option:String,
    dog:Array,
    message:Array
    
   
   });

module.exports = mongoose.model('Promenade', PromenadeSchema);