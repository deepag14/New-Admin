const { count } = require("console");
const { EmployeeDetail } = require("../models/employee.model");
const { LoginByEmailAndPassword } = require("./admin.services");
const createemployee = async (req) => {
  let body = req.body;
  console.log(body, "body")
  let creates = await EmployeeDetail.create(body);
 console.log("fghvbjmnsdf");
  return creates;
};
const getUserdetails = async (req) => {
  const { userId } = req;
  let findUserID = await EmployeeDetail.findById(userId);
  console.log(findUserID);
  if (!findUserID) {
    return null;
  } else {
    let clientData = {
      user: findUserID.user,
      email: findUserID.email,
      contact: findUserID.contact,
      role: findUserID.role,
      gender: findUserID.gender,
      course: findUserID.course,
      pimage: findUserID.pimage,
    };
    return clientData;
  }
};


const getusers = async (req) => {
  let body = req.body;
  let get = await EmployeeDetail.find();
  return get;
  console.log(get);
};
const getusersbyid = async (req) => {
  let _id = req.params.id;
  let getbyid = await EmployeeDetail.findById(_id);
  console.log(getbyid);
  return getbyid;
};
const updateusers = async (req, path) => {
  let _id = req.params.id;
  
  let update = await EmployeeDetail.findById(_id);
  console.log(update,"Tetsing");
  if (!update) {
    console.log("User Details not found");
  } else {
    if (path == null) {
      update=await EmployeeDetail.findByIdAndUpdate({_id:_id},req.body,{new:true})

    } else {
      let datasWithImagePath = { ...req.body, ...{ pimage: path } };
      update = await EmployeeDetail.findByIdAndUpdate(
        { _id: _id },
        datasWithImagePath,
        {
          new: true,
        }
      );
    }
  }
  return update;
};
const uploadImage = async (req, path) => {
  let id = req.params.id;
  let getUserID = await EmployeeDetail.findById(id);
  if (!getUserID) {
    console.log("user not found");
  } else {
    const uploadprofile = await User.findByIdAndUpdate(
      { _id: id },
      { profilepicture: path },
      { new: true }
    );
    return uploadprofile;
  }
};

const deleteemployee=async(req)=>{
  let _id=req.params.id;
  let deletedata =await EmployeeDetail.findById(_id);
  if(!deletedata){
    console.log("Data Not deleted")
  }else{
    deletedata=await EmployeeDetail.findByIdAndDelete({_id:_id},req.body,{new:true});
  }
return deletedata;

};
const countemployee=async(req)=>{
  const data=await EmployeeDetail.find().count();
  return data;
}
const searchEmployees = async (query) => {
  try {
    // Perform an exact match search on the 'name' field
    return await EmployeeDetail.find({
      user: query // Exact match
    });
  } catch (error) {
    throw new Error('Error searching employees: ' + error.message);
  }
};

module.exports = {
  createemployee,
  getUserdetails,
  searchEmployees,
  countemployee,
  getusers,
  getusersbyid,
  updateusers,
  uploadImage,
  deleteemployee,
};
