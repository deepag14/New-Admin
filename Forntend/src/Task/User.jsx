import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import {LoginSocialGoogle} from 'reactjs-social-login'
import axios from 'axios'
import { useNavigate } from "react-router";
export const User = () => {
  const navigate = useNavigate();
  const initialstate={
    user:"",
    pass:"",
  };
  const[loginData, setLoginData]=useState(initialstate);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]:value });
  };
  const handleLogin = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin/login" ,loginData);
      localStorage.setItem('token', response.data);
      localStorage.setItem('user',loginData.user);
  
      navigate('/Userhome');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="w-full  flex place-content-center  ">
    <div className="flex w-full h-screen items-center justify-center  ">
      <div className="p-8 w-[600px] h-[500px] text-black bg-transparent border boder-white  rounded-lg  shadow-lg shadow-green-200">
        
        <h1 className=" font-bold text-center text-black  text-2xl ">SIGN IN</h1>
        <div className=' h-[80%] w-full flex justify-center flex-col gap-10'>
        <form className='h-full w-full flex flex-col gap-6 justify-center' onSubmit={handleLogin} >
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
                  value={loginData.name}
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
                  value={loginData.name}
                  required
                />
              </div>
              <div className="flex flex-col mt-2">
              <button type='Submit' className="w-full h-10 border-2  rounded-md bg-green-200 font-semibold text-black">
                Sign In
              </button>

              </div>
              <div className='flex flex-col items-center gap-2  ' >
               <p>Not Yet Register? <Link to={`/Usereg`}><span>Sign Up</span></Link></p>
               <p>Or Sign Up using</p>
               <LoginSocialGoogle
               client_id="515390554168-ce0c9563g5rvd2vbcmgmsgl0bt3s4382.apps.googleusercontent.com"
               access_type="offline"
               onResolve={({provider,data})=>{
                console.log(provider,data)
               }}
               onReject={(err)=>{
                console.log(err)
               }}
               >
               <FcGoogle className=' text-3xl'/>
               </LoginSocialGoogle>
                
              </div>
            </form>
            </div>
      </div>
    </div>
  </div>
  )
}
