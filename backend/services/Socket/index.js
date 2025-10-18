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
    const { userId } = socket.handshake.auth;
    users[userId] = socket.id; // ánh xạ userId → socket.id

    console.log("Users online:", users);
    socket.on("message", ({ userId, message }) => {
      console.log(`📩 From ${userId}: ${message} `);

      // Gửi lại cho tất cả client, kèm theo thông tin người gửi
      io.emit("message", {
        userId: userId,
        message: message,
      });
    });
    socket.on("disconnect", () => {
      delete users[userId]; // xóa khi out
    });
  });
};

export default setupSocket;
