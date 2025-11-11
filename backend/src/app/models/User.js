import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  avatar: { type: String, default: "logo.png" },
  onlineStatus: { type: Boolean, default: false },
  lastOnline: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
