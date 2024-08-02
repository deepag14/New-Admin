import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Edit } from "./Task/Edit";

import { User } from "./Task/User";

import { Viewuser } from "./Task/Viewuser";
import { Usereg } from "./Task/Usereg";
import { Userhome } from "./Task/Userhome";
import { Create } from "./Task/Create.jsx";

function App() {
  return (
   <div>
   <Routes>
  <Route path="/" element={<User />} />
  <Route path="/Usereg" element={<Usereg />} />
 
  <Route path="/Userhome" element={<Userhome />} />
  <Route path="/Create" element={<Create />} />
  {/* <Route path="/User/Profile" element={<Userprofile />} /> */}
  <Route path="/View" element={<Viewuser />} />
  <Route path="/Edit/:id" element={<Edit />} />
  </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

