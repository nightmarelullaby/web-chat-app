import mongoose from "mongoose";
const mongouri = "mongodb+srv://nightmarelullaby:2860960Nierautomata@cluster0.5e8lqjx.mongodb.net/chat?retryWrites=true&w=majority"


export const connectDB = async () => {
  try {
    await mongoose.connect(
      mongouri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};