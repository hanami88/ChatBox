import User from "../../app/models/User.js";
import Message from "../../app/models/Message.js";
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
    socket.on("message", ({ user, message }) => {
      Message.create({
        sender: user,
        content: message,
      });
      // Gửi lại cho tất cả client, kèm theo thông tin người gửi
      io.emit("message", {
        user: user,
        message: message,
      });
    });
    socket.on("disconnect", () => {
      delete users[user._id]; // xóa khi out
    });
  });
};

export default setupSocket;
