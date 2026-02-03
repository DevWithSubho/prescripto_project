import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logoutHandlr = () => {
    adminToken && localStorage.removeItem("adminToken");
    adminToken && setAdminToken("");
    dtoken && localStorage.removeItem("dToken");
    dtoken && setDtoken("");
    navigate("/doctor-dashboard");
  };
  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border p-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={() => logoutHandlr()}
        className="bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer"
      >
        logout
      </button>
    </div>
  );
};

export default Navbar;
