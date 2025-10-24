import Sidebar from "../Sidebar";
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
import socketConnect from "../../services/Socket";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
function DefaultLayout({ children }) {
  const { user } = useContext(UserContext);
  const socket = socketConnect(user);
  const [check, setCheck] = useState(false);
  const [line, setLine] = useState(true);
  const [message, setMessage] = useState([]);
  const sendMessage = () => {
    socket.emit("message", { user, message });
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
    <div className="DefaultLayout h-screen w-full flex  bg-[length:100%_100%] bg-center relative">
      <Sidebar />
      <img
        src="_.jpeg"
        alt=""
        className="w-[75vw] h-full absolute left-[25vw] z-[-1]"
      />
      <div className="w-[75vw] flex items-center flex-col">
        <div className="fixed top-0 right-0 w-[75vw] h-[5.6rem] bg-[#212121] shadowname flex justify-between items-center ">
          <div className="flex items-center ml-[2vw] w-[14.3rem] justify-between">
            <img
              src="liemlol.jpg"
              alt="anh"
              className="rounded-[1rem] h-[4.5rem] w-[4.5rem]"
            />
            <div>
              <div className="text-[1.7rem] text-white font-[600]">
                Thanh Liêm
              </div>
              <div className="text-[1.4rem] text-[#AAAAAA] mt-[-0.3rem]">
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
          <div className="w-[50vw] ml-3">{children}</div>
        </div>
        <div
          className={`h-[1px] w-[50vw] mb-5 ${
            line ? "bg-white line" : "bg-[#00000000]"
          }`}
        ></div>
        <div className="w-[50vw] flex justify-center ">
          <div className="flex relative w-full">
            <div className="w-[2.4rem] h-[2.4rem] absolute top-[12px] left-[13px] bg-[rgb(135,116,225)] rounded-[0.75rem] flex items-center justify-center ">
              <FontAwesomeIcon
                icon={faBars}
                className="text-[1.5rem] text-[#000000] cursor-pointer"
              />
            </div>
            <FontAwesomeIcon
              icon={faFaceSmile}
              className="text-[2.4rem] text-[#7c7c7c] absolute top-[12px] left-[47px] cursor-pointer hover:text-[rgb(135,116,225)]"
            />
            <textarea
              value={message}
              className="text-[1.5rem] resize-none pl-[8.8rem] pr-[9.5rem] py-5 w-[92%] h-[4.8rem] rounded-[1rem] bg-[#1e1e1e] placeholder:text-[#dcdcdcb3] text-white outline-none"
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
              } text-[2.4rem] text-[#7c7c7c] absolute top-[12px] right-[113px] cursor-pointer hover:text-[rgb(135,116,225)]`}
            />
            <FontAwesomeIcon
              icon={faPaperclip}
              className="text-[2.2rem] text-[#7c7c7c] absolute top-[14px] right-[73px] cursor-pointer hover:text-[rgb(135,116,225)]"
            />
            <div className="group h-[4.8rem] w-[4.8rem] rounded-full flex justify-center items-center bg-[#212121] ml-5 cursor-pointer hover:text-white hover:bg-[rgb(135,116,225)]">
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
    </div>
  );
}

export default DefaultLayout;
