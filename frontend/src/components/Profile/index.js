import { FontAwesomeIcon, faXmark, faPhone, faPencil } from "../../Icon";
import { SidebarContext } from "../../SidebarContext";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
function Profile() {
  const { user } = useContext(UserContext);
  const { setShowProfile } = useContext(SidebarContext);
  return (
    <div className="w-[25vw] bg-[#212121] flex flex-col items-center border-l-[1px] border-[#48484874]">
      <div className="flex justify-between text-[2rem] text-[white] items-center w-[90%] mt-5">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-[#AAAAAA] cursor-pointer "
          onClick={() => {
            setShowProfile(false);
          }}
        />
        <div className="mr-[10rem]">プロフィール</div>
        <FontAwesomeIcon
          icon={faPencil}
          className="text-[#AAAAAA] text-[1.8rem]"
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <img
          className="w-[12rem] h-[12rem] mt-[4rem] rounded-[3rem]"
          src={`${user.avatar}`}
          alt=""
        />
        <div className="text-[2rem] text-[#FFFFFF] mt-[1.5rem]">
          {user.username}
        </div>
        <div className="text-[1rem] text-[#AAAAAA]">オンライン</div>
      </div>
      <div className="mt-[2rem] w-[95%] rounded-[1.2rem] flex items-center cursor-pointer hover:bg-[rgb(44,44,44,1)] py-[0.5rem]">
        <FontAwesomeIcon
          icon={faPhone}
          className="text-[2.2rem] text-[#AAAAAA] mr-[2.8rem] ml-[1rem]"
        />
        <div>
          <div className="text-[1.6rem] text-white font-[400]">
            +84 569 015 738
          </div>
          <div className="text-[1.4rem] text-[#AAAAAA] font-[400]">Phone</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
