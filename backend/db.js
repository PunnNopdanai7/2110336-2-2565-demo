const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting to MongoDB...");

  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => {
      console.log(`MongoDB Connected: ${res.connection.host}`);
    })
    .catch((err) => {
      console.log(`Error: ${err?.message}`);
    });
};

module.exports = connectDB;
