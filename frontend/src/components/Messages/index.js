import { Fragment } from "react/jsx-runtime";

let message = [
  {
    data: "Hello",
    role: "0",
  },
  {
    data: "Good news, no limits are currently applied to your account. You’re free as a bird!",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
  {
    data: "Good news, no limits are currently applied to your na. You’re free as a bird!",
    role: "0",
  },
  {
    data: "Do you want fuck me",
    role: "1",
  },
];

function Messages() {
  return (
    <Fragment>
      {message.map((i, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            i.role === "0" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-white text-[1.5rem] rounded-[1rem] px-4 py-2 max-w-[60%] leading-[2.1rem] flex ${
              i.role === "0" ? "bg-[#766AC8]" : "bg-[#212121]"
            }`}
          >
            <div className="w-[90%] mr-5">{i.data}</div>
            <div
              className={` text-[1.2rem] self-end mb-[-4px] ${
                i.role === "0" ? "text-[#FFFFFF88]" : "text-[#686C72BF]"
              }`}
            >
              13:26
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default Messages;
