import DefaultLayout from "./components/DefaultLayout";
import Messages from "./components/Messages";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/xacnhandangnhap", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.success);
      });
  }, []);
  return (
    <Router>
      <div className="App w-[100vw] h-[100vh]">
        <Routes>
          <Route
            path="/login-page"
            element={
              user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />
            }
          ></Route>
          <Route
            path="/register-page"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRouter user={user}>
                <DefaultLayout>
                  <Messages />
                </DefaultLayout>
              </PrivateRouter>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
