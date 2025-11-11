import { useEffect, useContext, Fragment } from "react";
import { UserContext } from "../../UserContext.js";
import { SidebarContext } from "../../SidebarContext.js";
function Messages() {
  const { user, socket, changeMessageRoom, setRooms, rooms } =
    useContext(UserContext);
  const { setChat, chat } = useContext(SidebarContext);
  useEffect(() => {
    socket.on("message", ({ user: sender, roomId, message, room }) => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;
      setChat((prev) => [...prev, { sender, message, time }]);
      changeMessageRoom(roomId, message);
      if (room) {
        setRooms([...rooms, room]);
      }
    });
    return () => socket.disconnect();
  }, [socket]);
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
              className={` text-white text-[1.5rem] rounded-[1rem] px-4 py-2 max-w-[67%] leading-[2.1rem] flex
              ${
                user._id === sender._id
                  ? "dark:bg-[#766AC8] bg-[#dcf8c5]"
                  : "dark:bg-[#212121] bg-white"
              }`}
            >
              <div
                className={`w-[100%] mr-5 break-words ${
                  user._id === sender._id
                    ? "dark:text-[white] text-black"
                    : "text-[#212121] dark:text-white"
                }`}
              >
                {message}
              </div>
              <div
                className={`text-[1.2rem] self-end mb-[-4px]  ${
                  user._id === sender._id
                    ? "dark:text-[#FFFFFF88] text-[#4fae4e]"
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
