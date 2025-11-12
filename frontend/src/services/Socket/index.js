import { io } from "socket.io-client";

const socketConnect = (user) => {
  return io(`${process.env.REACT_APP_API_URL}`, {
    auth: { user },
  });
};

export default socketConnect;
