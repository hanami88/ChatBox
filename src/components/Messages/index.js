import { Fragment } from "react/jsx-runtime";

let message = [
  {
    data: "Hello",
    role: "0",
  },
  {
    data: "Good Morning",
    role: "1",
  },
  {
    data: "What is your name ?",
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
          className={`flex mb-3 ${
            i.role === "0" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`text-white text-[1.5rem] rounded-[1rem] px-4 py-2 max-w-[70%] ${
              i.role === "0" ? "bg-[#766AC8]" : "bg-[#212121]"
            }`}
          >
            {i.data}
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default Messages;
