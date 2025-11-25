import { useEffect, useContext, Fragment, useState, useRef } from "react";
import { UserContext } from "../../Contexts/UserContext.js";
import { SidebarContext } from "../../Contexts/SidebarContext.js";
function Messages() {
  const { user, socket, changeMessageRoom, setRooms, rooms } =
    useContext(UserContext);
  const { setChat, chat } = useContext(SidebarContext);
  const [showTimeId, setShowTimeId] = useState(null);
  let timeoutId = useRef(null);
  const hoverOneSecond = (index) => {
    timeoutId.current = setTimeout(() => {
      setShowTimeId(index);
    }, 500);
  };
  const cancelHoverOneSecond = (index) => {
    clearTimeout(timeoutId.current);
    if (showTimeId != null) setShowTimeId(null);
  };
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
  }, [socket, changeMessageRoom, rooms, setChat, setRooms]);
  return (
    <Fragment>
      {chat &&
        chat.map(({ sender, message, time }, index) => (
          <div
            key={index}
            className={`flex mb-2 items-center ${
              user._id === sender._id ? "justify-end" : "justify-start"
            }`}
          >
            {user._id === sender._id && (
              <div
                className={`${
                  showTimeId !== index && "hidden"
                } text-[1.2rem] self-end  self-center px-[1.2rem] h-[3.2rem] flex justify-center items-center rounded-[1rem] mr-1 dark:bg-[#ffffffb0] bg-[#000000af]
                  dark:text-[black] text-[white]
              }`}
              >
                <div>{time}</div>
              </div>
            )}
            <div
              onMouseEnter={() => {
                hoverOneSecond(index);
              }}
              onMouseLeave={() => {
                cancelHoverOneSecond(index);
              }}
              className={` text-white text-[1.5rem] rounded-[2rem] px-[1.2rem] py-[0.8rem] max-w-[67%] leading-[2.1rem] flex 
              ${
                user._id === sender._id
                  ? "dark:bg-[#766AC8] bg-[#dcf8c5]"
                  : "dark:bg-[#212121] bg-white"
              }`}
            >
              <div
                className={`w-[100%] break-words ${
                  user._id === sender._id
                    ? "dark:text-[white] text-black"
                    : "text-[#212121] dark:text-white"
                }`}
              >
                {message}
              </div>
            </div>
            {user._id !== sender._id && (
              <div
                className={`${
                  showTimeId !== index && "hidden"
                } text-[1.2rem] self-end  self-center px-[1.2rem] h-[3.2rem] flex justify-center items-center rounded-[1rem] ml-1 dark:bg-[#ffffffb0] bg-[#000000af]
                  dark:text-[black] text-[white]
              }`}
              >
                <div>{time}</div>
              </div>
            )}
          </div>
        ))}
    </Fragment>
  );
}

export default Messages;
