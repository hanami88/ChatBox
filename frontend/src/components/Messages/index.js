import { useEffect, useState, useContext, Fragment } from "react";
import socketConnect from "../../services/Socket";
import { UserContext } from "../../UserContext.js";
function Messages() {
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState([]);
  useEffect(() => {
    const socket = socketConnect(user);
    fetch("http://localhost:8080/api/user/message", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setChat(data);
      });
    socket.on("message", ({ user, message }) => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;
      setChat((prev) => [...prev, { user, message, time }]);
    });
    return () => socket.disconnect();
  }, []);
  return (
    <Fragment>
      {chat.map(({ user: sender, message, time }, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            user._id !== sender._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-white text-[1.5rem] rounded-[1rem] px-4 py-2 max-w-[60%] leading-[2.1rem] flex
              ${user._id !== sender._id ? "bg-[#766AC8]" : "bg-[#212121]"}`}
          >
            <div className="w-[90%] mr-5">{message}</div>
            <div
              className={` text-[1.2rem] self-end mb-[-4px] ${
                user._id !== sender._id
                  ? "text-[#FFFFFF88]"
                  : "text-[#686C72BF]"
              }`}
            >
              {time}
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default Messages;
