import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appoinmentModel.js";
import razorpay from "razorpay";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "missimg details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter strong password" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      message: "user successfully added",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//api to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    const userData = await userModel.findById(userId).select("-password");
    return res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: fals, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user;
    const imageFile = req.file;
 
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imgUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imgUrl });
    }

    return res.json({ success: true, message: "profile updated" });
  } catch (error) {
    console.log(error);
  }
};

//Api to book appoinment
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
  
    const userId = req.user;
    const docData = await doctorModel.findById(docId).select("-password");
   
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not availble" });
    }
    let slot_booked = docData.slot_booked;
    //checking for slots availbility
   
    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } else {
      slot_booked[slotDate] = [];

      slot_booked[slotDate].push(slotTime);
    
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slot_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppoinment = new appointmentModel(appointmentData);
    await newAppoinment.save();

    //save new slotdata in docdata
 
    const docttr = await doctorModel.findByIdAndUpdate(docId, { slot_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

const getAllAppoinments = async (req, res) => {
  try {
    const userId = req.user;
    const allAppoinmentsData = await appointmentModel.find({ userId });
    res.json({ success: true, allAppoinmentsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user;
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (appointment.userId !== userId) {
      return res.json({ success: false, message: "unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    const { docId, slotDate, slotTime } = appointment;
    const doctorData = await doctorModel.findById(docId);
    let slot_booked = doctorData.slot_booked;
    slot_booked[slotDate] = slot_booked[slotDate].filter((item) => {
      return item !== slotTime;
    });
    await doctorModel.findByIdAndUpdate(docId, { slot_booked });
    return res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
  
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }
    //creating option for razorpay payment
    let amoutntInInr = appointmentData.amount * 90;
    const options = {
      amount: amoutntInInr * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    const order = await razorpayInstance.orders.create(options);
    
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Api to verify appointment payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
   
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "payment sucessful" });
    } else {
      res.json({ success: true, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: fals, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getAllAppoinments,
  cancelAppointment,
  paymentRazorpay,
  verifyPayment,
};
