import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import {
  faBars,
  FontAwesomeIcon,
  faMagnifyingGlass,
  faPlus,
  faBookmark,
  faUser,
  faGear,
  faUserGroup,
  faCircleHalfStroke,
  faArrowLeft,
} from "../../Icon";
import BoxSidebar from "../BoxSidebar/index.js";
function Sidebar() {
  const { user, users } = useContext(UserContext);
  const [hidden, setHidden] = useState(true);
  const friends = users.filter((user1) => user.friends.includes(user1._id));
  const [isOpen, setIsOpen] = useState(false);
  const [boxSidebar, setBoxSidebar] = useState(friends);
  const checkOpen = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };
  const back = () => {
    setBoxSidebar(friends);
    setHidden(true);
  };
  return (
    <div className="w-[25vw] bg-[#212121] h-full text-[1.7rem] border-r-[1px] border-[#48484874]">
      <div className="mb-4">
        <div className="flex justify-center items-center relative h-[5.6rem] ">
          <div
            className={` ${
              isOpen ? "bg-[#2C2C2C]" : "bg-[#212121]"
            } cursor-pointer relative h-[4rem] w-[4rem] flex justify-center items-center text-center rounded-[50%] hover:bg-[#2C2C2C] z-50`}
          >
            <FontAwesomeIcon
              icon={hidden ? faBars : faArrowLeft}
              className="text-[2.2rem] text-[#ffffffaf] "
              onClick={() => {
                hidden ? checkOpen() : back();
              }}
            />
            <div
              className={`${
                isOpen ? "" : "hidden"
              }  w-[25rem] text-[1.4rem] font-[500] text-[white] h-[31rem] bg-[rgba(33,33,33,0.867)] shadow absolute top-[4.8rem] left-[0rem] backdrop-blur-[1rem] rounded-[0.75rem] `}
            >
              <div className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] mt-[0.6rem] mb-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem] ">
                <img
                  src={user.avatar}
                  alt=""
                  className="w-[2.4rem] h-[2.4rem] ml-[0.5rem] mr-[2rem] rounded-[0.75rem]"
                />
                <div>{user.username}</div>
              </div>
              <div className="bg-[#FFFFFF1A] h-[0.1rem] w-full"></div>
              <div
                onClick={() => {
                  setBoxSidebar(users);
                  setHidden(false);
                  setIsOpen(false);
                }}
                className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] my-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem]"
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className=" text-[1.6rem] text-[rgb(170,170,170)] ml-[0.7rem] mr-[2.2rem]"
                />
                <div>アカウントを追加</div>
              </div>
              <div className="bg-[#FFFFFF1A] h-[0.1rem] w-full"></div>
              <div className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] my-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem]">
                <FontAwesomeIcon
                  icon={faUser}
                  className=" text-[1.6rem] text-[rgb(170,170,170)] ml-[0.7rem] mr-[2.2rem]"
                />
                <div>マイプロフィール</div>
              </div>
              <div className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] my-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem]">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className=" text-[1.6rem] text-[rgb(170,170,170)] ml-[0.7rem] mr-[2.2rem]"
                />
                <div>保存されたメッセージ</div>
              </div>
              <div className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] my-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem]">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className=" text-[1.6rem] text-[rgb(170,170,170)] ml-[0.7rem] mr-[2.2rem]"
                />
                <div>連絡先</div>
              </div>
              <div className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] my-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem]">
                <FontAwesomeIcon
                  icon={faGear}
                  className=" text-[1.6rem] text-[rgb(170,170,170)] ml-[0.7rem] mr-[2.2rem]"
                />
                <div>設定</div>
              </div>
              <div className="flex items-center h-[3.2rem] py-[0.4rem] pr-[1.2rem] pl-[0.4rem] mx-[0.4rem] my-[0.4rem] hover:bg-[#00000066] rounded-[0.5rem]">
                <FontAwesomeIcon
                  icon={faCircleHalfStroke}
                  className=" text-[1.6rem] text-[rgb(170,170,170)] ml-[0.7rem] mr-[2.2rem]"
                />
                <div>ナイトモード</div>
              </div>
              <div className="h-[3.55rem] w-full flex items-center justify-center mt-3 cursor-default">
                <div className="text-[#AAAAAA] text-[1.3rem]">
                  友コネクト 12.0.3
                </div>
              </div>
            </div>
          </div>
          <input
            type="text"
            className="bg-[#2C2C2C] placeholder:text-[#dcdcdcb3] text-white w-[28.2rem] ml-[1rem]  h-[4.4rem] rounded-[2.2rem] p-[0.6rem_0.9rem_0.7rem_4.9rem]  outline-none
            border-2
            border-[#2C2C2C]
            focus:border-[rgb(135,116,225)]
            focus:bg-[#1e1e1e]
            focus:outline-none text-[1.6rem]"
            placeholder="検索"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-[1.8rem] left-[7.9rem] text-[1.8rem] text-[#7a7a7a80]"
          />
        </div>
        <div className="flex text-[1.6rem] h-[4.4rem] items-center shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
          <div className="text-[#AAAAAA] text-[1.6rem] font-[600] w-[5.5rem] h-full flex items-center justify-center ml-[1rem] rounded-[1rem] hover:text-[#8774E1] cursor-pointer ">
            <span>全て</span>
          </div>
          <div className="text-[#AAAAAA] text-[1.6rem] font-[600] w-[6.9rem] h-full flex items-center justify-center rounded-[1rem] hover:text-[#8774E1] cursor-pointer">
            <span>チャット</span>
          </div>
        </div>
      </div>
      <div className="w-[25vw] flex items-center text-white flex-col">
        <BoxSidebar contents={boxSidebar} hidden={hidden} />
      </div>
    </div>
  );
}

export default Sidebar;
