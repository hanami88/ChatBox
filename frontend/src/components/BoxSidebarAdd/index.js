import { Fragment } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext.js";
import { SidebarContext } from "../../Contexts/SidebarContext.js";
import { toast } from "react-toastify";
function BoxSidebar({ contents, hidden }) {
  const { user, rooms } = useContext(UserContext);
  const { setNavMessage, setNav } = useContext(SidebarContext);
  const arrayCheckFriend = contents.map((friend) => {
    return user.friends.includes(friend._id);
  });
  useEffect(() => {
    if (user && contents.length > 0) {
      const arrayCheckFriend = contents.map((friend) =>
        user.friends.includes(friend._id)
      );
      setIsFriend(arrayCheckFriend);
    }
  }, [contents, user]);
  const timeAgoSimple = (lastTime) => {
    const now = new Date();
    const diffMs = now - new Date(lastTime);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMinutes < 60) {
      if (diffMinutes < 1) {
        return `1分`;
      }
      return `${diffMinutes} 分`;
    } else if (diffHours < 24) {
      return `${diffHours} 時`;
    } else {
      return `${diffDays} 日`;
    }
  };
  const addFriend = (friend) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/themban`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendid: friend._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message, { autoClose: 1000 });
        } else {
          toast.error(data.message, { autoClose: 1000 });
        }
      });
  };
  const deleteFriend = (friend) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/xoaban`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendid: friend._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message, { autoClose: 1000 });
        } else {
          toast.error(data.message, { autoClose: 1000 });
        }
      });
  };
  const [isFriend, setIsFriend] = useState(arrayCheckFriend);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const handleAdd = (index) => {
    setIsFriend(
      isFriend.map((friend, index1) => {
        return index1 === index ? !friend : friend;
      })
    );
  };
  if (contents) {
    return (
      <Fragment>
        {contents.map((content, index) => {
          return (
            content._id !== user._id && (
              <div
                onClick={() => {
                  setNavMessage(content);
                  setNav(content);
                  setSelectedDiv(content._id);
                }}
                key={index}
                className={`relative h-[7.2rem] w-[95%] min-w-[30rem] rounded-[1.2rem] cursor-pointer flex items-center justify-between
                  ${
                    selectedDiv === content._id
                      ? "dark:bg-[rgb(118,106,200,1)] bg-[#71d446]" // ✅ màu khi được chọn
                      : "dark:hover:bg-[rgb(44,44,44)] hover:bg-[rgb(244,244,245)]" // ✅ màu khi hover
                  }`}
              >
                <div className="relative">
                  <img
                    src={content.avatar}
                    alt="logo"
                    className="w-[5.4rem] min-w-[5.4rem] min-h-[5.4rem] h-[5.4rem] rounded-[1rem] ml-4 mr-4 "
                  />
                  <div
                    className={`${
                      !content.onlineStatus && "hidden"
                    } absolute bottom-[0rem] right-[0rem] w-[1.8rem]  h-[1.8rem] bg-[#24832C] border-2 rounded-full`}
                  ></div>
                </div>
                <div className="w-[18.7vw] min-w-[20rem] rounded-[1.2rem] ">
                  <div className="flex items-center justify-between">
                    <div
                      className={`text-[1.6rem] font-[600] mb-[0.1rem]  ${
                        selectedDiv === content._id
                          ? "text-[white] " // ✅ màu khi được chọn
                          : "dark:text-[white] text-[black]"
                      }`}
                    >
                      {content.name}
                    </div>
                    <div
                      className={`text-[1.2rem] rounded-[1.2rem] mr-5 ${
                        selectedDiv === content._id
                          ? "text-[white] " // ✅ màu khi được chọn
                          : "dark:text-[#8C8C8C91] text-[rgb(142,142,146)]"
                      }`}
                    >
                      {hidden
                        ? rooms &&
                          (() => {
                            const time = rooms.find((room) => {
                              const memberIds = room.members.map((m) =>
                                m.toString()
                              );
                              return (
                                memberIds.includes(user._id) &&
                                memberIds.includes(content._id)
                              );
                            })?.lastMessage?.createdAt;
                            return timeAgoSimple(time);
                          })()
                        : ""}
                    </div>
                  </div>
                  <div
                    className={`text-[1.5rem] h-[2.25rem] w-[27rem] overflow-hidden text-ellipsis whitespace-nowrap ${
                      selectedDiv === content._id
                        ? "dark:text-[white]"
                        : "dark:text-[rgb(170,170,170)] text-[rgb(142,142,146)]"
                    }`}
                  >
                    {(rooms &&
                      rooms.find((room) => {
                        const memberIds = room.members.map((m) => m.toString());
                        return (
                          memberIds.includes(user._id) &&
                          memberIds.includes(content._id)
                        );
                      })?.lastMessage?.content) ||
                      ""}
                  </div>
                </div>
                <div
                  onClick={() => {
                    !isFriend[index]
                      ? addFriend(content)
                      : deleteFriend(content);
                    handleAdd(index);
                  }}
                  className={`${
                    isFriend[index] ? "bg-[#d5d5d51f]" : "bg-[#71d446]"
                  } text-[1.2rem] text-white font-[600] absolute right-[0.4rem] hover:opacity-[0.6] px-[1rem] py-[0.8rem] rounded-[1.2rem] bg-[#71d446] ${
                    hidden ? "hidden" : ""
                  }`}
                >
                  {isFriend[index] ? "Bạn bè" : "Thêm bạn bè"}
                </div>
              </div>
            )
          );
        })}
      </Fragment>
    );
  }
}

export default BoxSidebar;
