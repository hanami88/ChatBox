import { Fragment } from "react/jsx-runtime";
import DefaultLayout from "./components/DefaultLayout";
import Messages from "./components/Messages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const submitForm = () => {
    localStorage.setItem("userId", userId);
    setUserId("");
  };
  return (
    <Router>
      <div className="App w-[100vw] h-[100vh]">
        <Routes>
          <Route
            path="/login"
            element={
              <div className="text-[2rem]">
                <input
                  type="text"
                  name="userId"
                  value={userId}
                  className="border-black bg-black text-white"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
                <button
                  onClick={submitForm}
                  className="text-black border-black border-[0.2rem]"
                >
                  concac
                </button>
              </div>
            }
          ></Route>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Messages />
              </DefaultLayout>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
