import { io } from "socket.io-client";

const socketConnect = (user) => {
  return io("http://localhost:8080", {
    auth: { user },
    transports: ["websocket"], // bắt buộc dùng websocket, tránh lỗi polling
  });
};

export default socketConnect;
