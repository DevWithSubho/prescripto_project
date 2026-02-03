import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loginState, setLoginState] = useState("sign up");
  const { Baceknd_Url, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (loginState === "sign up") {
        const { data } = await axios.post(`${Baceknd_Url}/api/user/register`, {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${Baceknd_Url}/api/user/login`, {
          email: email.current.value,
          password: password.current.value,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      className="min-h-[80vh] flex items-center "
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {loginState === "sign up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {loginState === "sign up" ? "sign up" : "login"} to book
          appointment
        </p>
        {loginState === "sign up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              ref={name}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            ref={email}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            ref={password}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 my-2 rounded-md text-base"
        >
          {loginState === "sign up" ? "Create Account" : "Login"}
        </button>

        {loginState === "sign up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setLoginState("login")}
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setLoginState("sign up")}
            >
              click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
