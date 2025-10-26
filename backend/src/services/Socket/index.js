import User from "../../app/models/User.js";
import Message from "../../app/models/Message.js";
import Room from "../../app/models/Room.js";
import { Server } from "socket.io";
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // React app
      methods: ["GET", "POST"],
    },
  });
  const users = {};
  io.on("connection", (socket) => {
    const { user } = socket.handshake.auth;
    users[user._id] = socket.id; // ánh xạ userId → socket.id
    socket.on("message", async ({ user, receiver, message }) => {
      let room = await Room.findOne({
        isGroup: "false",
        members: { $all: [user._id, receiver._id], $size: 2 },
      });
      if (!room) {
        room = await Room.create({
          isGroup: "false",
          members: [user._id, receiver._id],
        });
      }
      Message.create({
        sender: user,
        roomId: room._id,
        content: message,
      });
      // Gửi lại cho tất cả client, kèm theo thông tin người gửi
      const receiverSocket = users[receiver._id];
      if (receiverSocket) {
        io.to(receiverSocket).emit("message", {
          user,
          roomId: room._id,
          message,
        });
      }
      // 4️⃣ Gửi lại cho chính người gửi để hiển thị luôn
      io.to(users[user._id]).emit("message", {
        user,
        roomId: room._id,
        message,
      });
    });
    socket.on("disconnect", () => {
      delete users[user._id]; // xóa khi out
    });
  });
};

export default setupSocket;
