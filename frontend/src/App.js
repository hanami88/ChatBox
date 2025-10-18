import { Fragment } from "react/jsx-runtime";
import DefaultLayout from "./components/DefaultLayout";
import Messages from "./components/Messages";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
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
          <Route path="/login-page" element={<LoginPage />}></Route>
          <Route path="/register-page" element={<RegisterPage />}></Route>
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
