const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const EmployeeController=require('./src/controllers/employee.controller')
const AdminController =require("./src/controllers/admin.controller")
const fileupload=require('./src/middlewares/userfile')
const {verifyAuthToken}=require("./src/middlewares/auth")
app.use(express.static("images"));
app.options("*", cors());
app.use(cors());

let port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://deepalakshmig14:Jesusde1406@cluster0.lg6jaya.mongodb.net/Users"
  )
  .then((e) => {
    console.log("Database Connected to Mongoose");
  })
  .catch((error) => {
    console.log(error);
  });

  app.post("/upload",fileupload.upload.single("images"),EmployeeController.upload)
app.put("/uploadimage/:id",fileupload.upload.single("images"),EmployeeController.uploadUpdate)

app.post("/create/user", EmployeeController.createemployee);



app.post("/user/login",EmployeeController.LoginByEmailAndPassword)
app.get("/get/user",EmployeeController.getusers);
app.get("/get/user/:id",EmployeeController.getusersbyid);
app.put("/update/user/:id",fileupload.upload.single("images"), EmployeeController.updateusers);
app.delete("/delete/user/:id", EmployeeController.deleteemployee);
app.get("/count/user", EmployeeController.countemployee);
app.get("/search/user", EmployeeController.searchEmployees);

app.post("/admin/reg", AdminController.createadmin);

app.post("/admin/login",AdminController.LoginByEmailAndPassword)
app.get("/admin/detail",AdminController.getAdmindetails)


app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
