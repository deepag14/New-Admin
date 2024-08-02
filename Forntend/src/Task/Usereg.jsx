import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";


export const Usereg = () => {
  const navigate = useNavigate();
  const initialstate = {
    
    user: "",
    pass: "",
    
  };
  const [formData, setData] = useState(initialstate);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({ ...formData, [name]: value });
  };
 
  
  console .log(formData)
  const handleLogin = async (event) => {
    event.preventDefault();
   await axios
      .post("http://localhost:3000/admin/reg",formData)
      .then((res) => {
        if (res.data) {
          toast.success("Register the user Successfully");
        }
        navigate("/");
      })
      .catch((error) => toast.error("Something Went wrong"))
      .finally(() => {
        setData(initialstate);
      });
    console.log(formData);
  };


  return (
    <div className="w-full  flex place-content-center  ">
    <div className="flex w-full h-screen items-center justify-center  ">
      <div className="p-8 w-[600px] h-[500px] text-black bg-transparent border boder-white  rounded-lg  shadow-lg shadow-green-200">
        
        <h1 className=" font-bold text-center text-black  text-2xl ">SIGN UP</h1>
        <div className=' h-[80%] w-full flex justify-center flex-col gap-10'>
        <form className='h-full w-full flex flex-col gap-4 justify-center ' onSubmit={handleLogin} >
  
              
              
              <div className=" w-full flex flex-col mt-2 ">
                <label className="mb-1 text-l  font-semibold text-left">
                  UserName
                </label>
                <input
                  className=" px-2 py-1 w-full  text-black bg-transparent border-2 border-green-700
             "
                  type="text"
                  name="user"
                  placeholder="Enter UserName"
                  onChange={handleChange}
                  value={formData.user}
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
                <label className="mb-1 text-l  font-semibold text-left">
                  Password
                </label>
                <input
                  className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
             "
                  type="password"
                  name="pass"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  value={formData.pass}
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
              <button className="w-full h-10 border-2  rounded-md bg-green-200 font-semibold text-black">
                Sign Up
              </button>

              </div>
              <div className='flex flex-col items-center gap-2  ' >
               <p>Already Register? <Link to={`/`}><span className=" text-green-950 font-semibold">Sign In</span></Link></p>
               
               
                
              </div>
            </form>
            </div>
      </div>
    </div>
  </div>
  );
};
  