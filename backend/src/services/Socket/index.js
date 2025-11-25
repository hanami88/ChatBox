import Message from "../../app/models/Message.js";
import User from "../../app/models/User.js";
import Room from "../../app/models/Room.js";
import { Server } from "socket.io";
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // React app
      methods: ["GET", "POST"],
    },
  });
  const users = new Map();
  io.on("connection", async (socket) => {
    const { user } = socket.handshake.auth;
    let first = false;
    users.set(user._id, socket.id); // ánh xạ userId → socket.id
    await User.findByIdAndUpdate(user._id, {
      onlineStatus: true,
    });
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
        first = true;
      }
      const presentMessage = await Message.create({
        sender: user,
        roomId: room._id,
        content: message,
      });
      room.lastMessage = presentMessage._id;
      await room.save();
      // Gửi lại cho tất cả client, kèm theo thông tin người gửi
      const presentRoom = await Room.findById(room._id).populate("lastMessage");
      const receiverSocket = users.get(receiver._id);
      if (receiverSocket) {
        io.to(receiverSocket).emit("message", {
          user,
          roomId: room._id,
          message,
          room: first ? presentRoom : null,
        });
      }
      // 4️⃣ Gửi lại cho chính người gửi để hiển thị luôn
      socket.emit("message", {
        user,
        roomId: room._id,
        message,
        room: first ? presentRoom : null,
      });
    });
    socket.on("disconnect", async () => {
      users.delete(user._id); //xoa khi out
      await User.findByIdAndUpdate(user._id, {
        lastOnline: new Date(),
        onlineStatus: false,
      });
    });
  });
};

export default setupSocket;
