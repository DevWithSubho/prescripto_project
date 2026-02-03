import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [selectedDoc, setSelectedDoc] = useState([]);
  const listedDoctor = () => {
    if (speciality) {
      const specialistDoctor = doctors.filter((doctor) => {
        return doctor.speciality === speciality;
      });

      setSelectedDoc(specialistDoctor);
    } else {
      setSelectedDoc(doctors);
    }
  };
  useEffect(() => {
    listedDoctor();
  }, [speciality, doctors]);
  return (
    <div className="ml-5">
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* ................left section............ */}
        <div className="flex flex-col gap-4 text-sm text-gray-600 ">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300"
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Gynecologist"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300"
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Dermatologist"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300"
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Pediatricians"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300"
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Neurologist"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300"
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-300"
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        {/* ............right section............... */}
        <div className="w-full grid grid-cols-4 gap-4 gap-y-6">
          {selectedDoc.map((doctor) => {
            return (
              <div
                key={doctor._id}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500"
                onClick={() => navigate(`/appoinment/${doctor._id}`)}
              >
                <img src={doctor.image} alt="" className="bg-blue-50" />
                <div
                  className={`flex items-center gap-2 text-sm text-center ${doctor.available}`}
                >
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
      </div>
    </div>
  );
};

export default Doctors;
