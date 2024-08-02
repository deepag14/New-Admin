const mongoose=require("mongoose");
const {v4}=require("uuid");

const AdminSchema=new mongoose.Schema({
    _id:{
        type:String,
        default:v4,
    },
    user:{
        type:String,
        required:true,
        trim:true,
    },
    pass:{
        type:String,
        required:true,
        trim:true
    },
    active:{
        type:Boolean,
        default:true,
    },
},
{timestamps:true}
);
const AdminDetail=mongoose.model("admin",AdminSchema);
module.exports={AdminDetail}