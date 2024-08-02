const { register } = require("module");
const{ AdminDetail }=require("../models/admin.model")
const Bcrypt=require('bcryptjs')
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createadmin=async(req)=>{
    const {user,pass}=req.body;
    let salt= Bcrypt.genSaltSync(10);
    let hash= Bcrypt.hashSync(pass,salt);
    let create= await AdminDetail.create({...req.body, ...{pass:hash}});
    console.log(create);
    console.log(hash)
    return create;
    
 
    };

    const LoginByEmailAndPassword = async (req, res) => {
      const { user, pass } = req.body;
      const findadmin = await AdminDetail.findOne({ user: user });
      console.log(findadmin, "findadmin");
      
      if (!findadmin) {
        return  {message: "Invalid user"}
      } else {
        let compare = await Bcrypt.compare(pass, findadmin.pass);
        if (compare) {
          const token = jwt.sign(
            { id: findadmin.id, user: findadmin.user },
            'Sceret key', 
            { expiresIn: '1h' } 
          );
          return token
        } else {
          return { message: "Invalid password" };
        }
      }
    };
    const getAdmindetails = async (req) => {
      const { userId } = req;
      let findUserID = await AdminDetail.findById(userId);
      console.log(findUserID);
      if (!findUserID) {
        return null;
      } else {
        let clientData = {
          user: findUserID.user,
         
         
        };
        return clientData;
      }
    };


module.exports={
    createadmin,LoginByEmailAndPassword,getAdmindetails
}