import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Chatbox");
    console.log("ket noi database thanh cong");
  } catch (err) {
    console.log("khong ket noi duoc database :" + error);
    process.exit(1);
  }
};
export default Database;
