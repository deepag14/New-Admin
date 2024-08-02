import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

export const Create = () => {
  const navigate = useNavigate();
  const initialstate = {
   user:"",
   email:"",
   contact:"",
   role:"",
   gender:"",
   course:"",
   pimage:"",
  };
  const [formData, setData] = useState(initialstate);
  const [profileImage, setProfileImage] = useState(null);
  
  const handleChange = (event) => {
    const { value, name } = event.target;
    setData({ ...formData, [name]: value });
  };
  const handleUploadProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
  };
  
  console.log(formData)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('images', profileImage);
    const response = await axios.post("http://localhost:3000/upload", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response from server:", response);

    const { data } = response;

    console.log("Data from server:", data);

    if (data.success) {
      const updatedDetails = { ...formData, pimage: data.image_url };
      console.log("Updated product details:", updatedDetails);

    await axios
      .post("http://localhost:3000/create/user", updatedDetails)
      .then((res) => {
        if (res.data) {
          toast.success("Add User Detail Successfully");
        }
        navigate("/View");
      })
      .catch((error) => toast.error("Something Went wrong"))
      .finally(() => {
        setData(initialstate);
      });
    console.log(formData);
  };
}

  return (
    <div className="w-full  flex place-content-center  ">
      <div className="flex items-center justify-center  shadow-xl">
        <div className="p-8 w-[600px] text-black bg-transparent border boder-white  rounded-lg  shadow-lg">
          <h1 className=" font-bold text-center text-black ">Create Employee</h1>
          <form onSubmit={handleSubmit}>
             <div className="flex flex-col mt-2">
<label className="mb-1 text-l  font-semibold text-left">
  Name
</label>
<input
  className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
     "
  type="text"
  placeholder="Name"
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
   type="email"
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
<div className="flex flex-col mt-2">
            <label className="mb-1 text-l  font-semibold text-left">
              Profile Image
            </label>
            <input
              className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                 "
              type="file"
              name="images"
              accept="image/*"
              required
              onChange={handleUploadProfileImage}
            />
            {formData.pimage && <p>{formData.pimage.name}</p>}
          </div>

            <div className="flex flex-col mt-2 justify-center items-center">
              <button  type="submit" className="w-20 h-10 border-2  rounded-md bg-green-200 font-semibold text-black">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  }





  