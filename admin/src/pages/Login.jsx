import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const { setAdminToken, backendUrl, adminToken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);
  const email = useRef();
  const password = useRef();
  const [loginStatus, setLoginStatus] = useState("Admin");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (loginStatus === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email: email.current.value,
          password: password.current.value,
        });
     
        if (data.success) {
          setAdminToken(data.token);
          localStorage.setItem("adminToken", data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email: email.current.value,
          password: password.current.value,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDtoken(data.token);
          
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (adminToken) {
      navigate("/");
    }
  }, [adminToken]);
  return (
    <form
      className="min-h-[80vh] flex items-center "
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col items-start m-auto gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-blue-500">{loginStatus}</span> login
        </p>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            type="email"
            id="password"
            ref={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            required
          />
        </div>
        <button
          className="bg-blue-600 text-white w-full py-2 rounded-md text-base"
          type="submit"
        >
          Login
        </button>
        <p>
          {loginStatus === "Admin" ? "Doctor" : "Admin"} login?{" "}
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() =>
              setLoginStatus((prev) => (prev === "Admin" ? "Doctor" : "Admin"))
            }
          >
            click here
          </span>{" "}
        </p>
      </div>
    </form>
  );
};

export default Login;
