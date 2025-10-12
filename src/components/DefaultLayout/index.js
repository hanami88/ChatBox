import Sidebar from "../Sidebar";
import {
  faFaceSmile,
  faBars,
  faHexagonNodes,
  faPaperclip,
  faMicrophone,
  FontAwesomeIcon,
} from "../Icon";
function DefaultLayout({ children }) {
  return (
    <div className="DefaultLayout h-screen w-full flex  bg-[length:100%_100%] bg-center relative">
      <Sidebar />
      <img
        src="_.jpeg"
        alt=""
        className="w-[75vw] h-full absolute left-[25vw] z-[-1]"
      />
      <div className="w-[75vw] flex justify-center ">
        <div>
          <div className="w-[50vw] h-[90vh]">{children}</div>
          <div className="flex relative">
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
              className="text-[1.5rem] resize-none pl-[8.8rem] pr-[9.5rem] py-5 w-[92%] h-[4.8rem] rounded-[1rem] bg-[#1e1e1e] placeholder:text-[#dcdcdcb3] text-white outline-none"
              placeholder="Message"
            />
            <FontAwesomeIcon
              icon={faHexagonNodes}
              className="text-[2.4rem] text-[#7c7c7c] absolute top-[12px] right-[113px] cursor-pointer hover:text-[rgb(135,116,225)]"
            />
            <FontAwesomeIcon
              icon={faPaperclip}
              className="text-[2.2rem] text-[#7c7c7c] absolute top-[14px] right-[73px] cursor-pointer hover:text-[rgb(135,116,225)]"
            />
            <div className="group h-[4.8rem] w-[4.8rem] rounded-full flex justify-center items-center bg-[#212121] ml-5 cursor-pointer hover:text-white hover:bg-[rgb(135,116,225)]">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-[2.3rem] text-[#7c7c7c] group-hover:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
