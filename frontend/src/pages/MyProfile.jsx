import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const { userData, setUserData, Baceknd_Url, token, getUserProfileData } =
    useContext(AppContext);
  const [image, setImage] = useState(false);
  const updateUserProfiledata = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);
      const { data } = await axios.post(
        `${Baceknd_Url}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await getUserProfileData();
        setIsEditable(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // const userName = useRef();
  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm ml-5 ">
        {isEditable ? (
          <label htmlFor="img">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? null : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              type="file"
              id="img"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEditable ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium  text-3xl">{userData.name}</p>
        )}
        <hr className="w-full h-px bg-zinc-400 my-2"></hr>
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[2fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEditable ? (
              <input
                className="bg-gray-100 max-w-52
            "
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEditable ? (
              <p>
                <input
                  className="bg-gray-50"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <br />
                <input
                  className="bg-gray-50"
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[2fr_3fr] w-full gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEditable ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) => {
                  return setUserData((prev) => {
                    return { ...prev, gender: e.target.value };
                  });
                }}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEditable ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                value={userData.dob}
                onChange={(e) => {
                  return setUserData((prev) => {
                    return { ...prev, dob: e.target.value };
                  });
                }}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        {isEditable ? (
          <button
            className="self-start border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            onClick={updateUserProfiledata}
          >
            Save information
          </button>
        ) : (
          <button
            className="self-start border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            onClick={() => setIsEditable(true)}
          >
            Edit
          </button>
        )}
      </div>
    )
  );
};

export default MyProfile;
