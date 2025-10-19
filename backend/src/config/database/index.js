import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Chatbox");
    console.log("Ket noi database thanh cong");
  } catch (error) {
    console.log("khong ket noi duoc database :" + error);
    process.exit(1);
  }
};
export default Database;
