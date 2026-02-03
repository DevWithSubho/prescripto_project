import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyAppoinments = () => {
  const { Baceknd_Url, token, gettingAllDoctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

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

  const gettingAllAppointmentsData = async () => {
    try {
      const { data } = await axios.get(
        `${Baceknd_Url}/api/user/get-allappointments`,
        {
          headers: { token },
        },
      );
      if (data.success) {
  
        setAppointments(data.allAppoinmentsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const canelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        `${Baceknd_Url}/api/user/cancel-appointment`,
        {
          appointmentId,
        },
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        gettingAllAppointmentsData();
        gettingAllDoctors();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment payment",
      description: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
     
        try {
          const { data } = await axios.post(
            `${Baceknd_Url}/api/user/payment-verify`,
            response,
            { headers: { token } },
          );
          if (data.success) {
            gettingAllAppointmentsData();
            navigate("/my-appoinments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${Baceknd_Url}/api/user/payment-razorpay`,
        {
          appointmentId,
        },
        {
          headers: {
            token,
          },
        },
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      gettingAllAppointmentsData();
    }
  }, [token]);
  return appointments.length > 0 ? (
    <div className="ml-5 mr-5">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-b-gray-400">
        My appoinment
      </p>
      <div>
    
        {appointments.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-400"
            >
              <div>
                <img className="w-32 bg-indigo-50" src={item.docData.image} />
              </div>
              <div className="flex-1 text-sm text-zinc-600 ">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>

                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                    paid
                  </button>
                )}
                {!item.payment && !item.cancelled && !item.isCompleted && (
                  <button
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300"
                    onClick={() => appointmentRazorpay(item._id)}
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer  hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={() => canelAppointment(item._id)}
                  >
                    Cancel apointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-700 mb-2">
          No Appointments Found
        </p>
        <p className="text-gray-500 mb-6">
          You don't have any scheduled appointments yet.
        </p>
        <p className="text-sm text-gray-400">
          Book an appointment with our doctors to get started.
        </p>
      </div>
    </div>
  );
};

export default MyAppoinments;
