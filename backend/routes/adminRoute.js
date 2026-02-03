import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctorLists,
  appointmentsAdmin,
  cancelAppointment,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import verifyAdmin from "../middlewares/authAdmin.js";
import { chngAvlbleStatus } from "../controllers/doctorController.js";
const adminRouter = express.Router();

adminRouter.post(
  "/add-doctor",
  verifyAdmin,
  upload.single("docImg"),
  addDoctor,
);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/docotrList", verifyAdmin, allDoctorLists);
adminRouter.post("/change-availability", verifyAdmin, chngAvlbleStatus);
adminRouter.get("/appointments", verifyAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", verifyAdmin, cancelAppointment);
adminRouter.get("/dashboard", verifyAdmin, adminDashboard);
export default adminRouter;
