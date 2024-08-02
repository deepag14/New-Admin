const mongoose = require("mongoose");
const { v4 } = require("uuid");

const EmployeeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    user: {
      type: String,
      required:true,
      trim: true,
    },
    email: {
      type: String,
      required:true,
      trim: true,
    },
    contact: {
      type: String,
      required:true,
      trim: true,
    },
    role:{
      type:String,
      required:true,
      trim:true,
    },
    gender:{
      type:String,
      required:true,
      trim:true,
    },
    course:{
      type:String,
      required:true,
      trim:true,
    },
    pimage:{
      type:String,
      required:true,
      trim:true,
    }, 
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const EmployeeDetail = mongoose.model("EmployeDetails", EmployeeSchema);
module.exports = { EmployeeDetail };
