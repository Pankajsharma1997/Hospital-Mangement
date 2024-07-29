import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact"
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
//  import PrivateComponent from "./components/Admin/PrivateComponent";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminLogin from "./components/Admin/AdminLogin";
import Dashboard from "./components/Admin/Dashboard";
import Header from "./components/Admin/Header"
import Sidebar from "./components/Admin/Sidebar";
import AddDoctors from "./components/Admin/AddDoctors";
import DoctorsList from "./components/Admin/DoctorsList";
import EditDoctorDetails from "./components/Admin/EditDoctorDetails";
function App() {

   const [token, setToken] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<PrivateComponent />}> */}
          <Route path="/admin_register" element={<AdminRegister />} />
          <Route
            path="/admin_login"
            element={<AdminLogin setToken={setToken} />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/header" element={<Header />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/add_doctor" element={<AddDoctors />} />
          <Route path="/doctors" element={<DoctorsList/>}/>
          <Route path="/edit_doctor/:id" element = {<EditDoctorDetails/>}/> 

          {/* </Route> */}
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About token={token} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
