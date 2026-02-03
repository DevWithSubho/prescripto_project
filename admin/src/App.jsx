import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login";
import { DoctorContext } from "./context/DoctorContext";

const App = () => {
  const { adminToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return adminToken || dtoken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <Outlet />
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer />
      <Login />
    </div>
  );
};
export default App;
