import { useContext, useRef, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState();
  const docName = useRef("");
  const docEmail = useRef("");
  const docPass = useRef("");
  const [experience, setExperience] = useState("1 Year");
  // const experience = useRef("1 Year");
  const fees = useRef("");
  const [speciality, setSpeciality] = useState("General physician");
  // const Speciality = useRef("");
  const education = useRef("");
  const address1 = useRef("");
  const address2 = useRef("");
  const aboutDoc = useRef("");
  const { adminToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    const form = new FormData();
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
      form.append("docImg", docImg);
      form.append("name", docName.current.value);
      form.append("email", docEmail.current.value);
      form.append("password", docPass.current.value);
      form.append("experience", experience);
      form.append("fees", fees.current.value);
      form.append("speciality", speciality);
      form.append("degree", education.current.value);
      form.append(
        "address",
        JSON.stringify({
          line1: address1.current.value,
          line2: address2.current.value,
        })
      );
      form.append("about", aboutDoc.current.value);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        form,
        {
          headers: { adminToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        docName.current.value = "";
        docEmail.current.value = "";
        docPass.current.value = "";
        setExperience("");
        fees.current.value = "";
        setSpeciality("");
        education.current.value = "";
        address1.current.value = "";
        address2.current.value = "";
        aboutDoc.current.value = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="m-5  w-full" onSubmit={onSubmitHandler}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            upload doctor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className=" w-full lg:flex-1 flex flex-col gap-4 ">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                ref={docName}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                ref={docEmail}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor password</p>
              <input
                ref={docPass}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                ref={fees}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="fees"
                required
              />
            </div>
          </div>
          <div className=" w-full lg:flex-1 flex flex-col gap-4 ">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                value={speciality}
                className="border rounded px-3 py-2"
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">
                  Gastroenterologist
                </option>{" "}
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                ref={education}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                ref={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                ref={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            ref={aboutDoc}
            className="w-full px-4 pt-2 border rounded"
            type="text"
            placeholder="write about doctor"
            rows={5}
            required
          ></textarea>
        </div>
        <button className="cursor-pointer bg-blue-600 px-10 py-3 mt-4 text-white rounded-full ">
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
