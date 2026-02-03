import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
const Appoinment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, Baceknd_Url, token, gettingAllDoctors } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [doctorInfo, setDoctorInfo] = useState(null); //here stored the specific doctor as object
 
  const [doctorSlots, setDoctorSlots] = useState([]);

  //here stored all the sloct with date, day and time
  const [slotIndex, setSlotIndex] = useState(0); //to chnge the background for click on  specific time and date
  const [slotTime, setSlotTime] = useState(""); //

  const bookAppoinment = async () => {
    if (!token) {
      toast.warn("Login to book appoinment");
      return navigate("/login");
    }
    try {
      const date = doctorSlots[slotIndex][0].dateTime;
  
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "/" + month + "/" + year;
      const { data } = await axios.post(
        `${Baceknd_Url}/api/user/book-appoinment`,
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        gettingAllDoctors();
        navigate("/my-appoinments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const takeAvailbleSlots = () => {
    setDoctorSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (currentdate.getDate() === today.getDate()) {
        currentdate.setHours(
          currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10
        );
        currentdate.setMinutes(
          currentdate.getHours() > 10
            ? currentdate.getMinutes() > 30
              ? 30
              : 0
            : 0
        );
      } else {
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentdate < endTime) {
        let formattedTime = currentdate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        let day = currentdate.getDate();
        let month = currentdate.getMonth() + 1;
        let year = currentdate.getFullYear();
        const slotDate = day + "/" + month + "/" + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          doctorInfo.slot_booked[slotDate] &&
          doctorInfo.slot_booked[slotDate].includes(slotTime)
            ? false
            : true;
  
        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentdate),
            time: formattedTime,
          });
        }
        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }
      setDoctorSlots((prev) => [...prev, timeSlots]);
    }
  };
  const docInfoFetch = async () => {
    const doc = doctors.find((doctor) => {
      return doctor._id === docId;
    });
    setDoctorInfo(doc);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      docInfoFetch();
    }
  }, [doctors, docId]);

  useEffect(() => {

    doctorInfo && takeAvailbleSlots();
  }, [doctorInfo, docId]);
  // const pageChnge = () => {
  //   navigate("/my-appoinments");
  //   scrollTo(0, 0);
  //   toast.success("Book Appointed");
  // };
  return (
    doctorInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 ml-30 mr-30 ">
          {/* .........doctor image......... */}
          <div>
            <img
              className="bg-blue-500 w-full sm:max-w-72 rounded-lg"
              src={doctorInfo.image}
              alt=""
            />
          </div>
          {/* ............doc info: name, degree, speciality, experience, about, fees............. */}
          <div className="flex-1 border  border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 -mt-20 sm:mt-0 ">
            {/* ........doc name...... */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {doctorInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {doctorInfo.degree}-{doctorInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorInfo.experience}
              </button>
              {/* .....doctor about............ */}
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {doctorInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/*..............Booking Slots.......... */}
        <div className="sm:ml-102 sm:pl-4 mt-8 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4">
            {doctorSlots.length &&
              doctorSlots.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-blue-500 text-white"
                        : "border border-gray-200"
                    }`}
                  >
                    <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className=" flex items-center gap-3 w-205 overflow-x-auto mt-4">
            {doctorSlots.length &&
              doctorSlots[slotIndex].map((item, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm font-light  shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === slotTime
                        ? "bg-blue-500 text-white"
                        : "border border-gray-400 text-gray-400"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
          <button
            className="bg-blue-500 text-white text-sm font-light px-20 py-3 rounded-full my-6 cursor-pointer"
            onClick={bookAppoinment}
          >
            Book an appoinment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={doctorInfo.speciality} />
      </div>
    )
  );
};

export default Appoinment;
