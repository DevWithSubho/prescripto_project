import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appoinmentModel.js";
const chngAvlbleStatus = async (req, res) => {
  const { docId } = req.body;

  try {
    const doc = await doctorModel.findById(docId);
    doc.available = !doc.available;
    await doc.save();
    return res.json({ success: true, message: "availibility change" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const gettingDocList = async (req, res) => {
  try {
    const docList = await doctorModel.find().select("-password -email");

    return res.json({ success: true, docList });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid credentials" });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Api to doctor appoitnments for doctor panel
const appoitnmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.user;

    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to mark appointment complete
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req.user;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req.user;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: true, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.user;
 
    const appointments = await appointmentModel.find({ docId });

    let earning = 0;
    appointments.map((appointment) => {
      if (appointment.payment || appointment.isCompleted) {
        earning += appointment.amount;
      }
    });
    let patients = [];
    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });
    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to get doctor profilefor doctor panel
const getDoctorProfileData = async (req, res) => {
  try {
    const { docId } = req.user;
    const docProfileData = await doctorModel
      .findById(docId)
      .select("-password");

    res.json({ success: true, docProfileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Api to update doctor profile for doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId } = req.user;
    const { fees, available, address } = req.body;
  
    await doctorModel.findByIdAndUpdate(docId, { fees, available, address });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  chngAvlbleStatus,
  gettingDocList,
  loginDoctor,
  appoitnmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  getDoctorProfileData,
  updateDoctorProfile,
};
