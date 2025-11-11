import { FontAwesomeIcon, faXmark, faPhone, faPencil } from "../../Icon";
import { SidebarContext } from "../../SidebarContext";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
function Profile() {
  const { user } = useContext(UserContext);
  const { setShowProfile } = useContext(SidebarContext);
  return (
    <div className="w-[25vw] dark:bg-[#212121] bg-white flex flex-col items-center border-l-[1px] border-[#48484874]">
      <div className="flex justify-between text-[2rem] text-[white] items-center w-[90%] mt-5">
        <FontAwesomeIcon
          icon={faXmark}
          className="dark:text-[#AAAAAA] text-[#828282] cursor-pointer "
          onClick={() => {
            setShowProfile(false);
          }}
        />
        <div className="mr-[10rem] dark:text-white text-black">
          プロフィール
        </div>
        <FontAwesomeIcon
          icon={faPencil}
          className="dark:text-[#AAAAAA] text-[#828282] text-[1.8rem]"
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <img
          className="w-[12rem] h-[12rem] mt-[4rem] rounded-[3rem]"
          src={`${user.avatar}`}
          alt=""
        />
        <div className="text-[2rem] dark:text-[#FFFFFF] text-black mt-[1.5rem]">
          {user.username}
        </div>
        <div className="text-[1rem] dark:text-[#AAAAAA] text-[#828282]">
          オンライン
        </div>
      </div>
      <div className="mt-[2rem] w-[95%] rounded-[1.2rem] flex items-center cursor-pointer hover:bg-[rgb(44,44,44,1)] py-[0.5rem]">
        <FontAwesomeIcon
          icon={faPhone}
          className="text-[2.2rem] dark:text-[#AAAAAA] text-[#828282] mr-[2.8rem] ml-[1rem]"
        />
        <div>
          <div className="text-[1.6rem] dark:text-[#FFFFFF] text-black font-[400]">
            +84 569 015 738
          </div>
          <div className="text-[1.4rem] dark:text-[#AAAAAA] text-[#828282] font-[400]">
            Phone
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
