import { useEffect, useState, useContext, Fragment } from "react";
import { UserContext } from "../../UserContext.js";
import { SidebarContext } from "../../SidebarContext.js";
function Messages() {
  const { user, socket, changeMessageRoom } = useContext(UserContext);
  const { setChat, chat } = useContext(SidebarContext);
  useEffect(() => {
    socket.on("message", ({ user: sender, roomId, message }) => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;
      setChat((prev) => [...prev, { sender, message, time }]);
      changeMessageRoom(roomId, message);
    });
    return () => socket.disconnect();
  }, [socket, changeMessageRoom]);
  return (
    <Fragment>
      {chat &&
        chat.map(({ sender, message, time }, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              user._id === sender._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`text-white text-[1.5rem] rounded-[1rem] px-4 py-2 max-w-[60%] leading-[2.1rem] flex
              ${user._id === sender._id ? "bg-[#766AC8]" : "bg-[#212121]"}`}
            >
              <div className="w-[90%] mr-5 break-words">{message}</div>
              <div
                className={` text-[1.2rem] self-end mb-[-4px] ${
                  user._id === sender._id
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
