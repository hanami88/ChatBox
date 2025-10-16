import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import socket from "../Socket";

let message = [
  {
    data: "Hello",
    role: "0",
  },
  {
    data: "Good news, no limits are currently applied to your account. You’re free as a bird!",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
];

function Messages() {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on("message", ({ userId, message }) => {
      setChat((prev) => [...prev, { userId, message }]);
    });
    return () => socket.off("message");
  }, []);
  return (
    <Fragment>
      {chat.map(({ userId, message }, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            userId === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-white text-[1.5rem] rounded-[1rem] px-4 py-2 max-w-[60%] leading-[2.1rem] flex
              ${userId === "me" ? "bg-[#766AC8]" : "bg-[#212121]"}`}
          >
            <div className="w-[90%] mr-5">{message}</div>
            <div
              className={` text-[1.2rem] self-end mb-[-4px] ${
                userId === "me" ? "text-[#FFFFFF88]" : "text-[#686C72BF]"
              }`}
            >
              13:26
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default Messages;
