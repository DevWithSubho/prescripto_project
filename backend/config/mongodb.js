import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
};

export default connectDB;
