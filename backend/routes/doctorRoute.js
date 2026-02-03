import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appoitnmentsDoctor,
  doctorDashboard,
  getDoctorProfileData,
  gettingDocList,
  loginDoctor,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoc from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/doclist", gettingDocList);

doctorRouter.post("/login", loginDoctor);

doctorRouter.post("/doctor-appointments", authDoc, appoitnmentsDoctor);
doctorRouter.post("/complete-appointment", authDoc, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoc, appointmentCancel);
doctorRouter.get("/dashboard", authDoc, doctorDashboard);
doctorRouter.get("/get-doctor-profile-data", authDoc, getDoctorProfileData);
doctorRouter.post("/update-profile", authDoc, updateDoctorProfile);
export { doctorRouter };
