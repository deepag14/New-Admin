import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { TbDatabaseEdit } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Create } from "./Create.jsx";
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import logo from "../assets/Logo.png"
export const Viewuser = () => {
  
  const menus = [
    { title: "HOME",path:"/Userhome"},
    { title: "CREATE EMPLOYEE",path:"/Create" },
    { title: "EMPLOYEE LIST",path:"/View" },
  
  ];
  const username = localStorage.getItem('user')
  const { id } = useParams();

  const [getUsersData, setGetUsersData] = useState([]);
  const [count,setCount]=useState(0);
  const getUsers = async () => {
    await axios.get(`http://localhost:3000/get/user`)
      .then((response) => {console.log(response);
        setGetUsersData(response.data)})

      .catch((error) => console.log(error))
      .finally();
  };
  const getCount = async () => {
    await axios
      .get(`http://localhost:3000/count/user`)
      .then((response) => {console.log(response);
        setCount(response.data.countdata)})

      .catch((error) => console.log(error))
      ;
  };
  const deleteUsers=async(id)=>{
    await axios
    .delete(`http://localhost:3000/delete/user/${id}`)
  
    .then((res)=>{
      console.log(id,"id");
      if(res.data){
        toast.success("Delete Employee  Successfully")
      }
      
    })
    .catch((error)=>toast.error("Data Not Deleted"))
    .finally(()=>{
      getUsers()
    }
     
    );
  }
  useEffect(() => {
    getUsers();
    getCount();
  }, []);
  console.log(getUsersData,"Datas");
  return (
    <div className=" flex w-full flex-col gap-4 h-screen items-center justify-center mt-10  ">
      
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
    <div className=" flex flex-col justify-center gap-6 w-full h-screen items-center ">
    
    <div className="flex   w-full gap-4 ml-[1800px]  -mt-20">
    <div className=" w-[90%]   "><p className="font-semibold   ml-80 ">Total Count:{count}</p></div>
    {/* <div className=" flex gap-4">
      <label className=" font-semibold text-md" >Search</label>
      <input type="search"  className=" px-6 py-1   text-black bg-transparent border-2 border-green-700 placeholder:
                   " placeholder="Enter Search Keyword"/>
    </div> */}
      
    </div>
    
      <div className=" font-bold text-xl text-green-600"><h1>EMPLOYEE LIST</h1></div>
      <div className="flex  justify-center   text-black-800  bg-clip-border rounded-xl ">
          
          <table className=" w-[100%] ">
            <thead className=" border-2  border-green-700">
              <tr className=" border  ">
             
                <th className=" border border-green-700  border-r-2  text-[15px]">
                  UserName
                </th>
                <th className=" border border-green-700  border-r-2  text-[15px]">
                  Profile Image
                </th>
                <th className=" border border-green-700  border-r-2  text-[15px]">
                 Email
                </th>
               
                <th className=" border  border-green-700  border-r-2   text-[15px]">
                  Mobile No
                </th>
                <th className=" border border-green-700  border-r-2  text-[15px]">
                  Designation
                </th>
                <th className=" border  border-green-700  border-r-2   text-[15px]">
                  Gender
                </th>
                <th className=" border  border-green-700  border-r-2   text-[15px]">
                  Course
                </th>
                <th className=" border  border-green-700  border-r-2   text-[15px]">
                  Create Date
                </th>
                <th className=" border  border-green-700  border-r-2   text-[15px]">
                  Action
                </th>
                
              </tr>
            </thead>
            <tbody className=" border-2  border-green-700">

              {getUsersData?.map((value) => (
                <tr key={value._id}>
                  <td className=" border  border-green-700 border-r-2    text-[14px] font-semibold">
                    {value.user}
                  </td>
                  <td className=" border  border-green-700 border-r-2 w-32 h-32    text-[14px] font-semibold">
                  <img className="  w-32 h-32 items-center" src={value.pimage} alt="" />
                  </td>
                  <td className=" border  border-green-700 border-r-2    text-[14px] font-semibold">
                   {value.email}
                  </td>
                  <td className=" border  border-green-700  border-r-2   text-[14px] font-semibold">
                    {value.contact}
                  </td>
                  <td className="  border  border-green-700  border-r-2   text-[14px] font-semibold">
                    {value.role}
                  </td>
                  <td className="  border  border-green-700  border-r-2   text-[14px] font-semibold">
                    {value.gender}
                  </td>
                 
                  <td className="border  border-green-700  border-r-2   text-[14px] font-semibold">
                    {value.course}
                  </td>
                  <td className="border  border-green-700 border-r-2    text-[14px] font-semibold">
                    {value.createdAt}
                  </td>
                  <td className="border  border-green-700 border-r-2    text-[14px] font-semibold">
                    <Link to={`/Edit/${value._id}`}  className=" text-green-600">Edit</Link>/<Link className=" text-red-600"  onClick={()=>deleteUsers(value._id)} >Delete</Link>
                  </td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
          
        </div>
    </div>
  </div>
  );
};
