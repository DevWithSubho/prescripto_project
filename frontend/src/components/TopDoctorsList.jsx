import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const TopDoctorsList = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-10 text-gray-950 md:mx-10 ">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-40 ">
        {doctors.slice(0, 10).map((doctor) => {
          return (
            <div
              key={doctor._id}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
              onClick={() => {
                navigate(`/appoinment/${doctor._id}`);
                scrollTo(0, 0);
              }}
            >
              <img src={doctor.image} alt="" className="bg-blue-50" />
              <div className= {`flex items-center gap-2 text-sm text-center ${doctor.available}`}>
                <p
                  className={`w-2 h-2 ${doctor.available ? `bg-green-500` : `bg-gray-500`} rounded-full`}
                ></p>
                <p>{doctor.available ? "Available" : "Not Available"}</p>
              </div>

              <p className="text-black-500 text-lg font-medium">
                {doctor.name}
              </p>
              <p>{doctor.speciality}</p>
            </div>
          );
        })}
      </div>
      <button
        className="bg-blue-50 cursor-pointer text-gray-600 px-12 py-3 rounded-full mt-10"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        more
      </button>
    </div>
  );
};

export default TopDoctorsList;
