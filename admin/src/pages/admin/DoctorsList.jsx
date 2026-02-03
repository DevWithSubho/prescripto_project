import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { backendUrl, adminToken } = useContext(AdminContext);
  const [docLists, setDocLists] = useState([]);
  const doctorLists = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/docotrList`, {
        headers: { adminToken },
      });
      if (data.success) {
        setDocLists(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const chngeAvailbility = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { adminToken } },
      );
      if (data.success) {
        toast.success(data.message);
        doctorLists();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (adminToken) {
      doctorLists();
    }
  }, [adminToken]);
  return (
    <div className="mb-5 max-h-[90vh]  overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6  ">

        {docLists.map((doc, indx) => {
          return (
            <div
              key={indx}
              className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group max-w-56"
            >
              <img
                src={doc.image}
                alt=""
                className="bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500"
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {doc.name}
                </p>
                <p className="text-zinc-600 text-sm ">{doc.speciality}</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={doc.available}
                    onChange={() => chngeAvailbility(doc._id)}
                    id={doc._id}
                  />
                  <label htmlFor={doc._id}>Available</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
