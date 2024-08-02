import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
export const Edit = () => {
  const [image, setImage] = useState(null);
  const { id } = useParams();
  
  const navigate = useNavigate();
  const initialState = {
    pimage:"",
    user: "",
    email: "",
    contact: "",
    role: "",
    course:"",
  };

  const [formData, setFormData] = useState(initialState);
  const filechange = (e) => {
    let selectedfile = e.target.files[0];
    setImage(selectedfile);

    console.log();
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (event) => {
    
    event.preventDefault();
    // let data ={..., ...{pimage:image}}
    let fom = new FormData()
    fom.append("images", image !=null?image:formData.pimage)
    fom.append("user", formData.user)
    fom.append("email", formData.email)
    fom.append("contact", formData.contact)
    fom.append("role", formData.role)
    fom.append("course", formData.course)
    
    await axios
      .put(`http://localhost:3000/update/user/${id}`, fom)

      .then((res) => {
        console.log(res,"Response"
        );
        if (res.data) {
          toast.success("Update Employee Successfully");
          
        }
        
       
      })
      .catch((error) =>
        console.log(error) )
      .finally(() => {
        // setFormData(initialState);
        navigate("/View");
      });
  };
  console.log(formData);

  const getUsersDataByID = async () => {
   
    await axios
      .get(`http://localhost:3000/get/user/${id}`,formData )
      .then((res) => setFormData(res.data))
      .catch((error) => console.log(error))
      .finally();
  };
  console.log(formData);

  useEffect(() => {
    getUsersDataByID();
  }, []);

  return (
    <div className="w-full  flex place-content-center  ">
      <div className="flex items-center justify-center  shadow-xl">
        <div className="p-8 w-[600px] text-black bg-transparent border boder-white  rounded-lg  shadow-lg">
          <h1 className=" font-bold text-center text-black ">EDIT USERS</h1>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col mt-2">
              {/* <label className="mb-1 text-l  font-semibold text-left">
                Profile
              </label> */}
              {/* <input
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                   "
                type="file"
                placeholder="profile image"
                name="pimage"
                value=<img className="  w-32 h-32 items-center" src={value.pimage} alt="" />
                required
                onChange={handleChange}
              /> */}
              {/* <img src={formData.pimage} alt="" /> */}
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">
                        {" "}
                        <img src={image == null?formData.pimage:URL.createObjectURL(image)} alt="" className="w-40" />
                      </span>
                    </p>
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={(e) => {
                      filechange(e);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <label className="mb-1 text-l  font-semibold text-left">
                Username
              </label>
              <input
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                   "
                type="text"
                placeholder="UserName"
                name="user"
                value={formData.user}
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mt-2">
              <label className="mb-1 text-l  font-semibold text-left">
                Email
              </label>
              <input
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                   "
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-2">
 <label className="mb-1 text-l  font-semibold text-left">
   Contact
 </label>
 <input
   className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
      "
   type="number"
   placeholder="Contact"
   name="contact"
   value={formData.contact}
   required
   onChange={handleChange}
 />
</div>
 <div className="flex flex-col mt-2">
 <label className="mb-1 text-l  font-semibold text-left">
   Designation
 </label>
 <select
   name="role"
   value={formData.role}
   required
   onChange={handleChange}
   className=" px-2 py-1  text-black bg-transparent border-2 border-green-700  "
 >
   <option>Select</option>
   <option>HR</option>
   <option>Manager</option>
   <option>Sales</option>
 </select>
</div>
<div className="flex flex-col mt-2">
 <label className="mb-1 text-l  font-semibold text-left">
   Gender
 </label>
 <div className=" px-2 py-1  flex gap-1 border-2 border-green-700">
 <div className="flex  ">
    <input
      className="  text-black "
      type="radio"
      name="gender"
            value="male"
            required
            checked={formData.gender === 'male'}
            onChange={handleChange}
    />
    <label className="ml-2">Male</label>
  </div>
  <div className="flex ">
    <input
      className="px-2 py-1 text-black"
      type="radio"
      name="gender"
            value="female"
            required
            checked={formData.gender === 'female'}
            onChange={handleChange}
    />
    <label className="ml-2">Female</label>
  </div>
  <div className="">
    <input
      className="px-2 py-1 text-black bg-transparent border-2 border-green-700"
      type="radio"
      name="gender"
            value="others"
            required
            checked={formData.gender === 'others'}
            onChange={handleChange}
    />
    <label className="ml-2">Other</label>
  </div>
  </div>
  </div>
  <div className="flex flex-col mt-2">
 <label className="mb-1 text-l  font-semibold text-left">
   Course
 </label>
 <div className=" px-2 py-1  flex gap-1 border-2 border-green-700">
 <div className="flex  ">
    <input
      className="  text-black "
      type="checkbox"
      name="course"
      value="MCA"
      checked={formData.course.includes("MCA")}
      onChange={handleChange}
    />
    <label className="ml-2">MCA</label>
  </div>
  <div className="flex ">
    <input
      className="px-2 py-1 text-black"
      type="checkbox"
            name="course"
            value="BCA"
            checked={formData.course.includes("BCA")}
            onChange={handleChange}
    />
    <label className="ml-2">BCA</label>
  </div>
  <div className="">
    <input
      className="px-2 py-1 text-black bg-transparent border-2 border-green-700"
      type="checkbox"
            name="course"
            value="BSC"
            checked={formData.course.includes("BSC")}
            onChange={handleChange}
    />
    <label className="ml-2">BSC</label>
  </div>
  </div>
  </div>

            <div className="flex flex-col mt-2 justify-center items-center">
              <button className="w-20 h-10 border-2  rounded-md bg-green-200 font-semibold text-black">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
