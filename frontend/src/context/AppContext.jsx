import { createContext, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const Baceknd_Url = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const gettingAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${Baceknd_Url}/api/doctor/doclist
      `);
      if (data.success) {
   
        setDoctors(data.docList);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${Baceknd_Url}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        console.log(data);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    gettingAllDoctors();
  }, []);
  useEffect(() => {
    if (token) {
      getUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);
  const value = {
    doctors,
    currencySymbol,
    Baceknd_Url,
    token,
    setToken,
    setUserData,
    userData,
    getUserProfileData,
    gettingAllDoctors,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
