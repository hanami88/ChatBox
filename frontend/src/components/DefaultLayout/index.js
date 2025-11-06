import Sidebar from "../Sidebar";
import Profile from "../Profile";
import {
  faFaceSmile,
  faBars,
  faHexagonNodes,
  faPaperclip,
  faMicrophone,
  FontAwesomeIcon,
  faMagnifyingGlass,
  faEllipsisVertical,
  faPhone,
  faPaperPlane,
} from "../../Icon";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { SidebarContext } from "../../SidebarContext.js";
function DefaultLayout({ children }) {
  const { user, socket } = useContext(UserContext);
  const [check, setCheck] = useState(false);
  const [line, setLine] = useState(true);
  const [message, setMessage] = useState([]);
  const [nav, setNav] = useState(null);
  const [chat, setChat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const setNavMessage = (receiver) => {
    fetch("http://localhost:8080/api/user/message", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, receiver }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const fixChat = data.message.map((msg) => {
            const date = new Date(msg.createdAt);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const time1 = `${hours}:${minutes}`;
            return {
              sender: msg.sender,
              message: msg.content,
              time: time1,
            };
          });
          setChat(fixChat);
        } else {
          setChat([]);
        }
      });
  };
  const sendMessage = () => {
    socket.emit("message", { user, receiver: nav, message });
    setMessage("");
  };
  const checkBtn = (message) => {
    if (message !== "") {
      setCheck(() => true);
    } else setCheck(() => false);
  };
  const checkLine = (height) => {
    if (height < 1098) {
      setLine(() => false);
    } else setLine(() => true);
  };
  return (
    <SidebarContext.Provider
      value={{
        setChat,
        setNavMessage,
        setNav,
        chat,
        setShowProfile,
      }}
    >
      <div className="DefaultLayout h-screen w-full flex  bg-[length:100%] bg-center relative">
        <Sidebar />
        <img
          src="bg4.jpeg"
          alt=""
          className="w-[75vw] dark:hidden  h-full absolute left-[25vw] z-[-1]"
        />
        <img
          src="bg5.jpeg"
          alt=""
          className="w-[75vw]  dark:block hidden h-full absolute left-[25vw] z-[-1]"
        />
        <div
          className={`${nav ? "" : "hidden"}  flex items-center flex-col ${
            showProfile ? " w-[50vw]" : "w-[75vw] "
          }`}
        >
          <div
            className={`${
              showProfile ? " w-[50vw]" : "w-[75vw] "
            }  fixed top-0 left-[25vw]  h-[5.6rem] dark:bg-[#212121] bg-[white] shadowname flex justify-between items-center `}
          >
            <div className="flex items-center ml-[2vw] w-[14.3rem] ">
              <img
                src={nav && nav.avatar}
                alt="anh"
                className="rounded-[1rem] h-[4.5rem] w-[4.5rem] mr-4"
              />
              <div>
                <div className="text-[1.7rem] dark:text-white text-black hite font-[600]">
                  {nav && nav.username}
                </div>
                <div className="text-[1.4rem] dark:text-[#AAAAAA] text-[rgb(142,142,146)] mt-[-0.3rem]">
                  オンライン
                </div>
              </div>
            </div>
            <div className="flex items-center w-[11rem] justify-between mr-[2.5rem]">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-[rgb(170,170,170)] text-[2rem]"
              />
              <FontAwesomeIcon
                icon={faPhone}
                className="text-[rgb(170,170,170)] text-[2rem]"
              />
              <div className="w-[2.1rem] h-[2.1rem] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="text-[rgb(170,170,170)] text-[1.8rem]"
                />
              </div>
            </div>
          </div>
          <div
            className="w-[75vw] h-[88vh] pt-[7rem] flex justify-center mb-1 overflow-y-auto scrollbar-transparent"
            onScroll={(e) => checkLine(e.target.scrollTop)}
          >
            <div className="w-[45vw] ml-3">{children}</div>
          </div>
          <div
            className={`h-[1px] w-[45vw] mb-5 ${
              line ? "bg-white line" : "bg-[#00000000]"
            }`}
          ></div>
          <div className={`w-[45vw]  flex justify-center `}>
            <div className="flex relative w-full">
              <div className="w-[2.4rem] h-[2.4rem] absolute top-[12px] left-[13px] dark:bg-[rgb(135,116,225)] bg-[#71d446] rounded-[0.75rem] flex items-center justify-center ">
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-[1.5rem] text-[#000000] cursor-pointer"
                />
              </div>
              <FontAwesomeIcon
                icon={faFaceSmile}
                className="text-[2.4rem] text-[#7c7c7c] absolute top-[12px] left-[47px] cursor-pointer dark:hover:text-[rgb(135,116,225)] hover:text-[#71d446]"
              />
              <textarea
                value={message}
                className="text-[1.5rem] resize-none pl-[8.8rem] pr-[9.5rem] py-5 w-[92%] h-[4.8rem] rounded-[1rem] bg-[white] dark:bg-[#212121] dark:placeholder:text-[#dcdcdcb3] placeholder:text-[#a2acb4] dark:text-white text-black outline-none"
                placeholder="メッセージを入力"
                onChange={(e) => {
                  checkBtn(e.target.value);
                  setMessage(e.target.value);
                }}
              />
              <FontAwesomeIcon
                icon={faHexagonNodes}
                className={`${
                  check && "hidden"
                } text-[2.4rem] text-[#7c7c7c] absolute top-[12px] right-[113px] cursor-pointer dark:hover:text-[rgb(135,116,225)] hover:text-[#71d446]`}
              />
              <FontAwesomeIcon
                icon={faPaperclip}
                className="text-[2.2rem] text-[#7c7c7c] absolute top-[14px] right-[73px] cursor-pointer dark:hover:text-[rgb(135,116,225)] hover:text-[#71d446]"
              />
              <div className="group h-[4.8rem] w-[4.8rem] rounded-full flex justify-center items-center dark:bg-[#212121] bg-white ml-2 cursor-pointer hover:text-white dark:hover:bg-[rgb(135,116,225)] hover:bg-[#71d446]">
                <FontAwesomeIcon
                  icon={check ? faPaperPlane : faMicrophone}
                  onClick={
                    check
                      ? () => {
                          sendMessage();
                          setCheck(false);
                        }
                      : undefined
                  }
                  className={`text-[2.3rem] group-hover:text-white ${
                    check ? "text-[rgb(135,116,225)]" : "text-[#7c7c7c]"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        {showProfile && <Profile />}
      </div>
    </SidebarContext.Provider>
  );
}

export default DefaultLayout;
