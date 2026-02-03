import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { adminToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appoinments"}
            className={({ isActive }) =>
              `flex w-40 items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appoinments</p>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />

            <p>Doctors Lists</p>
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p >Dashboard</p>
          </NavLink>
          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex w-40 items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appoinments</p>
          </NavLink>
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F4FF] border-r-4 border-blue-600" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />

            <p>profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
