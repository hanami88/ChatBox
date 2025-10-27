import { Fragment } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext.js";
import { SidebarContext } from "../../SidebarContext.js";
function BoxSidebar({ contents, hidden }) {
  const { user } = useContext(UserContext);
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
  }, [contents]);
  const addFriend = (friend) => {
    fetch("http://localhost:8080/api/user/themban", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: user._id, friendid: friend._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      });
  };
  const deleteFriend = (friend) => {
    fetch("http://localhost:8080/api/user/xoaban", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: user._id, friendid: friend._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      });
  };
  const [isFriend, setIsFriend] = useState(arrayCheckFriend);
  const handleAdd = (index) => {
    setIsFriend(
      isFriend.map((friend, index1) => {
        return index1 === index ? !friend : friend;
      })
    );
  };
  return (
    <Fragment>
      {contents.map((content, index) => {
        return (
          content._id !== user._id && (
            <div
              onClick={() => {
                setNavMessage(content);
                setNav(content);
              }}
              key={index}
              className="relative h-[7.2rem] w-[95%] rounded-[1.2rem] hover:bg-[rgb(44,44,44)] cursor-pointer flex items-center justify-between"
            >
              <img
                src={content.avatar}
                alt="logo"
                className="w-[5.4rem] h-[5.4rem] rounded-[1rem] ml-4"
              />
              <div className="w-[27rem]  rounded-[1.2rem]">
                <div className="flex items-center justify-between">
                  <div className="text-[1.6rem] font-[600] mb-[0.1rem]">
                    {content.username}
                  </div>
                  <div className="text-[1.2rem] rounded-[1.2rem] mr-5 text-[#8c8c91]">
                    {hidden ? "12:40" : ""}
                  </div>
                </div>
                <div className="text-[1.5rem] h-[2.25rem]">
                  Hello I'm {content.username}
                </div>
              </div>
              <div
                onClick={() => {
                  !isFriend[index] ? addFriend(content) : deleteFriend(content);
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

export default BoxSidebar;
