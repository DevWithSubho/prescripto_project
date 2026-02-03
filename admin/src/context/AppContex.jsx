import { createContext } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const calculatedAge = (dob) => {
    if (!dob || dob.includes("not selected")) return null;

    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const Currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const nameOfMonths = [
    "",
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "july",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("/");
    return (
      dateArray[0] +
      " " +
      nameOfMonths[Number(dateArray[1])] +
      " " +
      dateArray[2]
    );
  };
  const value = {
    calculatedAge,
    slotDateFormat,
    Currency,
    backendUrl
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
