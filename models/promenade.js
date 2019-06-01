const bd = require('./bd');


var PromenadeSchema = bd.mongoose.Schema({
   userId: {
      type: bd.mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    ville:String,
    cp:String,
    adress:String,
    date: String,
    heure:String,
    duree: String,
    warning:String,
    message:Array,
    latitude:Number,
    longitude:Number,
    participant:Number,
    distance:Number,
    description:String
   });

var promenadeModel= bd.mongoose.model('promenade', PromenadeSchema);
module.exports = promenadeModel