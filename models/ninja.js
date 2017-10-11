const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema = new Schema({     
       "type": {
            type : String,
            default : "point"
       },
       "coordinates": {
           type : [Number],
           index : "2dsphere"
       }
});
//craete ninja schema and model 
const NinjaSchema = new Schema({
    name : {
        type : String,
        required : [true,"Name field is required"]
    },
    rank : {
        type : String
    },
    avilable : {
        type : Boolean,
        default : false
    },
    //add in geo location
    "geometry" : {
        type : GeoSchema
    }
});

const Ninja = mongoose.model("ninja",NinjaSchema);

module.exports = Ninja;