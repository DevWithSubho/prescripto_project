import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "/admin";
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 px-20 mb-5 ml-5 mr-5 border-b border-b-grey-400 ">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 ">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-blue-300 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-blue-300 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-blue-300 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-blue-300 w-3/5 m-auto hidden" />
        </NavLink>
        <li
          className="border px-5 text-xs py-1.5 rounded-full cursor-pointer"
          onClick={() => window.open(adminUrl, "_blank")}
        >
          Admin Panel
        </li>
      </ul>
      <div className="flex items-center gap-4 ">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img className="w-8 rounded-full" src={userData.image} alt="" />{" "}
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appoinments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appoinment
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white p-8 py-3  rounded-full font-light hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}
        <img
          src={assets.menu_icon}
          className="w-6 md:hidden"
          onClick={() => setShowMenu(true)}
        />
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          }  right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}
        >
          <div className="flex items-center justify-between  px-5 py-6">
            <img className="w-36" src={assets.logo} />
            <img
              className="w-7"
              src={assets.cross_icon}
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              className="px-4 py-2 rounded inline-block "
              onClick={() => setShowMenu(false)}
              to="/"
            >
              <p>HOME</p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/doctors"
            >
              <p> ALL DOCTORS</p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              <p>ABOUT</p>
            </NavLink>
            <NavLink
              className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              <p>CONTACT</p>
            </NavLink>
            <button
              className="border px-5 text-xs py-1.5 rounded-full cursor-pointer"
              onClick={() => {
                setShowMenu(false);
                window.open(adminUrl, "_blank");
              }}
            >
              Admin Panel
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
