import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database");
  } catch (error) {
    console.error("connection failed: ", error.message);
    process.exit(1);
  }
};

export default connectToDB;
