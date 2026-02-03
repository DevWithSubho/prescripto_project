import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContex";
import { assets } from "../../assets/assets.js";

const Appoinment = () => {
  const { getAllAppointments, appointments, adminToken, cancelAppointment } =
    useContext(AdminContext);
  const { calculatedAge, slotDateFormat, Currency } = useContext(AppContext);
  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken, getAllAppointments]);
  return (
    <div className="w-full max-w-6xl">
      <p className="mb-3 text-lg font-medium">All appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <div
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex gap-2 items-center">
                  <img
                    className="w-8 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />
                  <p>{item.userData.name}</p>
                </div>
                <p>{calculatedAge(item.userData.dob)}</p>
                <p>
                  {slotDateFormat(item.slotDate)} , {item.slotTime}
                </p>
                <div className="flex gap-2 items-center">
                  <img
                    className="w-8 rounded-full bg-gray-200"
                    src={item.docData.image}
                    alt=""
                  />
                  <p>{item.docData.name}</p>
                </div>
                <p>
                  {Currency}
                  {item.amount}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 font-medium text-xs">
                    completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Appoinment;
