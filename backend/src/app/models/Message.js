import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, default: "text" },
    content: String,
    fileUrl: String,
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
