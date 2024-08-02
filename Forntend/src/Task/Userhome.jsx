import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { TbDatabaseEdit } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Create } from "./Create.jsx";

import { useEffect, useState } from "react";
import logo from "../assets/Logo.png"
export const Userhome = () => {
    const menus = [
        { title: "HOME",path:"/Userhome"},
        { title: "CREATE EMPLOYEE",path:"/Create" },
        { title: "EMPLOYEE LIST",path:"/View" },
      
      ];
      const username = localStorage.getItem('user')

  return (
    <div className=" flex w-full flex-col gap-4 h-screen items-center justify-center  ">
      
      <div className=" w-full h-10 flex  gap-5  shadow-md shadow-green-400">
        <div className=" flex justify-start  h-20 w-20  -mt-10   ">
<img src={logo} alt="" />
        </div>
        <div className="flex  gap-9 -mt-10 ml-40 ">
        <ul className="flex justify-center gap-10  ">
              {menus.map((menu, index) => {
                return (
                  <>
                    <li
                      key={index}
                      className=" flex   text-gray-700  text-[16px]  "
                    >
                      <div className=" flex   ">
                       <Link to={menu.path} className="flex items-center gap-6 text-green-800 font-bold cursor-pointer hover:text-green-500"> 
                        <span >
                          {menu.title}
                        </span></Link>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
        </div>
        <div className=" flex gap-10 -mt-5 ml-[700px] "> 
            <p className=" font-medium mt-1 text-lg">{username}-</p>
            <Link to={"/"}><IoIosLogOut className=" text-green-400 text-4xl " /></Link>
        </div>
        
          </div>
      <div className=" flex flex-col justify-center gap-6 w-[60%] h-[80%] items-center shadow-xl shadow-green-200 rounded-xl">
        <h1 className=" font-extrabold text-5xl text-green-800 ">Welcome Admin</h1>
        <div className="flex flex-col   text-black-800  bg-clip-border rounded-xl ">
          <div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
