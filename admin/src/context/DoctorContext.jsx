import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : false,
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfiledata] = useState(false);
  const gettingAppointmnents = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/doctor-appointments`,
        {},
        { headers: { dtoken } },
      );

      if (data.success) {
        setAppointments([...data.appointments].reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
  
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dtoken } },
      );
      if (data.success) {
        toast.success(data.message);
        gettingAppointmnents();
        getdashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dtoken } },
      );
      if (data.success) {
        toast.success(data.message);
        gettingAppointmnents();
        getdashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getdashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dtoken },
      });
      if (data.success) {
      
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.messeage);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/get-doctor-profile-data`,
        { headers: { dtoken } },
      );
      if (data.success) {
   
        setProfiledata(data.docProfileData);
      }
    } catch (error) {
      console.log(error);
      toast.success(error.messeage);
    }
  };
  const value = {
    dtoken,
    setDtoken,
    backendUrl,
    gettingAppointmnents,
    appointments,
    completeAppointment,
    cancelAppointment,
    getdashData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfiledata,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
