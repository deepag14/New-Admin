const EmployeeServices = require("../services/employee.service");
const {generateAuthToken}=require("../middlewares/auth");

const createemployee = async (req, res) => {
  let data = await EmployeeServices. createemployee(req);
  console.log(data);
  res.send(data);
};

const LoginByEmailAndPassword=async(req,res)=>{
  let data=await  EmployeeServices.LoginByEmailAndPassword(req);
  let token=await generateAuthToken(data);
  if(data){
    res.send({token:token,success:"Login Successfully"})
  }
  else{
    res.status(400).send({failed:"Invalid username or password"})
  }
 
}

const publicProfiles=async(req,res)=>{
  let data=await  EmployeeServices.getPublicProfiles(req);
  console.log(data)
  res.send(data);
}

const getUserdetails=async(req,res)=>{
  let data=await  EmployeeServices.getUserdetails(req);
  console.log(data)
  res.send(data);
}


const getusers=async(req,res)=>{
    let data=await  EmployeeServices.getusers(req);
    console.log(data)
    res.send(data);
  }
  
  const getusersbyid=async(req,res)=>{
    let data=await  EmployeeServices.getusersbyid(req);
    console.log(data)
    res.send(data);
  }

  
  const updateusers=async(req,res)=>{
    if(req.file){
      let fileName = `http://localhost:3000/${req.file.filename}`
      let data=await  EmployeeServices.updateusers(req, fileName);
      res.send(data);
      console.log("Data Updated");
    }else{
      
      let data=await  EmployeeServices.updateusers(req, null);
      console.log(data,"Data");
      res.send(data);
      
    }
 
  };

  const upload =async (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:3000/${req.file.filename}`
    })
}

const uploadUpdate= async (req,res)=>{
  data=req.file;
  if(data){
    // let path="/public"
    let fileName = data.filename
    console.log(fileName,"Controller")
    const userData = await  EmployeeServices.uploadImage(req,fileName)
    res.send(userData);
    console.log("UserData")
  }
  else{
    res.status(400).send("upload Failed");
  }
}
const deleteemployee=async(req,res)=>{
  let data=await EmployeeServices.deleteemployee(req);
  res.send(data);
}

const countemployee=async(req,res)=>{
  try{
    const countdata= await EmployeeServices.countemployee(req);
    res.send({countdata});
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const searchEmployees = async (req, res) => {
  try {
    const query = req.query.q || ''; // Default to an empty string if no query is provided
    const results = await EmployeeServices.searchEmployees(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports={
  deleteemployee,createemployee,searchEmployees,countemployee,LoginByEmailAndPassword,getUserdetails,publicProfiles,getusers,getusersbyid,updateusers,upload,uploadUpdate
}