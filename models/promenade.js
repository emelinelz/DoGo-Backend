const bd = require('./bd');


var PromenadeSchema = bd.mongoose.Schema({
   user: {
      type: bd.mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    ville:String,
    cp:String,
    adress:String,
    date: String,
    heure:String,
    duree: String,
    option:String,
    message:Array,
    latitude:Number,
    longitude:Number,
   
   });

var promenadeModel= bd.mongoose.model('promenade', PromenadeSchema);
module.exports = promenadeModel