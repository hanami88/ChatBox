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
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState(false);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/xacnhandangnhap", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(data.success);
        setUser(data.user);
        setUsers(data.users);
      });
  }, []);
  return (
    <Router>
      <div className="App w-[100vw] h-[100vh]">
        <Routes>
          <Route
            path="/login-page"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginPage
                  setLoading={setLoading}
                  setUser={setUser}
                  setUsers={setUsers}
                />
              )
            }
          ></Route>
          <Route
            path="/register-page"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRouter user={user} loading={loading} users={users}>
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
