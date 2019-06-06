const bd = require('./bd');


var PromenadeSchema = bd.mongoose.Schema({
   userId: {
      type: bd.mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    adress:String,
    date: String,
    heure:String,
    duree: String,
    warning:String,
    message:Array,
    latitude:Number,
    longitude:Number,
    participant:Array,
    distance:Number,
    description:String
   });

var promenadeModel= bd.mongoose.model('promenade', PromenadeSchema);
module.exports = promenadeModel