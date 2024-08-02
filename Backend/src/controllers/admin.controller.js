const AdminService=require("../services/admin.services")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createadmin=async(req,res)=>{
    let data=await AdminService.createadmin(req);
    console.log(data)
    res.send(data)
}
const LoginByEmailAndPassword=async(req,res)=>{
    let data=await AdminService.LoginByEmailAndPassword(req);
   console.log(data)
    res.send(data)
}
const getAdmindetails=async(req,res)=>{
    let data=await AdminService.getAdmindetails(req);
    console.log(data)
    res.send(data);
  }
 
  
module.exports={
   createadmin,LoginByEmailAndPassword,getAdmindetails
}