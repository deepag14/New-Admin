import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

export const Useregister = () => {
  const navigate = useNavigate();
  const initialstate = {
    pimage: "",
    role: "",
    user: "",
    pass: "",
    dob: " ",
    gender: "",
    email: "",
    contact: "",
    location: "",
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
  
  console .log(formData)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('images', profileImage);
    // formDataToSend.append('role', formData.role);
    // formDataToSend.append('user', formData.user);
    // formDataToSend.append('pass', formData.pass);
    // formDataToSend.append('dob', formData.dob);
    // formDataToSend.append('gender', formData.gender);
    // formDataToSend.append('email', formData.email);
    // formDataToSend.append('contact', formData.contact);
    // formDataToSend.append('location', formData.location);

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
        navigate("/User");
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
          <h1 className=" font-bold text-center text-black ">SIGN UP</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="flex flex-col mt-2">
              <label className="mb-1 text-l  font-semibold text-left">
                Roles
              </label>
              <select
                name="role"
                value={formData.role}
                required
                onChange={handleChange}
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700  "
              >
                <option>Select</option>
                <option>Public</option>
                <option>Private</option>
              </select>
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
                Password
              </label>
              <input
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                   "
                type="password"
                placeholder="Password "
                name="pass"
                value={formData.pass}
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="mb-1 text-l  font-semibold text-left">
                Date of Birth
              </label>
              <input
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                   "
                type="date"
                name="dob"
                value={formData.dob}
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="mb-1 text-l  font-semibold text-left">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                required
                onChange={handleChange}
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700  "
              >
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
              </select>
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
                Location
              </label>
              <input
                className=" px-2 py-1  text-black bg-transparent border-2 border-green-700
                   "
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                required
                onChange={handleChange}
              />
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