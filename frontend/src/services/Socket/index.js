import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:8080", {
  auth: { userId },
  transports: ["websocket"], // bắt buộc dùng websocket, tránh lỗi polling
});

export default socket;
