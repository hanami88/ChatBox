import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("ket noi database thanh cong");
  } catch (err) {
    console.log("khong ket noi duoc database :" + error);
    process.exit(1);
  }
};
export default Database;
