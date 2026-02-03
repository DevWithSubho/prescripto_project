import { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContex";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { profileData, setProfiledata, getProfileData, dtoken } =
    useContext(DoctorContext);
  const { Currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updatedata = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
         updatedata ,
        { headers: { dtoken } },
      );
      if (data.success) {
        setIsEdit(false);
        getProfileData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-blue-500 w-full sm:max-w-64 rounded-lg "
              src={profileData.image}
              alt=""
            />
          </div>
          {/* doc info: name, degree, experience */}
          <div className="flex-1  border border-stone-100 rounded-lg text-gray-700">
            <p className="flex items-center gap-2 text-3xl font-medium">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-xs rounded-full">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-1">
              Appointment fee:{" "}
              <span>
                {Currency}{" "}
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                    type="number"
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData.address.line1
                )}

                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfiledata((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                name=""
                id="available"
                onChange={() =>
                  isEdit &&
                  setProfiledata((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
              />
              <label htmlFor="available">Available</label>
            </div>
            {isEdit ? (
              <button
                className="px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-500 hover:text-white transition-all"
                onClick={() => updateProfile()}
              >
                Save
              </button>
            ) : (
              <button
                className="px-4 py-1 border border-blue-600 text-sm rounded-full mt-5 hover:bg-blue-500 hover:text-white transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};
export default DoctorProfile;
