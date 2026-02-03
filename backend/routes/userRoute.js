import express from "express";
import upload from "../middlewares/multer.js";
import {
  bookAppointment,
  cancelAppointment,
  getAllAppoinments,
  getProfile,
  loginUser,
  paymentRazorpay,
  registerUser,
  updateProfile,
  verifyPayment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appoinment", authUser, bookAppointment);
userRouter.get("/get-allappointments", authUser, getAllAppoinments);
userRouter.put("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/payment-verify", authUser, verifyPayment);
export default userRouter;
