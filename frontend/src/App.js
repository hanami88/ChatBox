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
import socketConnect from "./services/Socket";
function App() {
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState(false);
  const [loading, setLoading] = useState(null);
  const [rooms, setRooms] = useState([]);
  const changeMessageRoom = (roomId, message) => {
    setRooms((prev) =>
      prev.map((room) =>
        room._id === roomId
          ? {
              ...room,
              lastMessage: {
                ...room.lastMessage,
                content: message,
              },
            }
          : room
      )
    );
  };
  let socket;
  if (user) {
    socket = socketConnect(user);
  }
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
        setRooms(data.rooms);
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
                  setRooms={setRooms}
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
              <PrivateRouter
                user={user}
                loading={loading}
                users={users}
                socket={socket}
                rooms={rooms}
                changeMessageRoom={changeMessageRoom}
              >
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
