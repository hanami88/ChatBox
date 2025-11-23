import { Navigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
function PrivateRouter({
  children,
  user,
  loading,
  users,
  socket,
  changeMessageRoom,
  rooms,
  setRooms,
}) {
  if (loading === null) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }
  if (loading === false) {
    return <Navigate to="/login-page" />;
  }
  return (
    <UserContext.Provider
      value={{
        user,
        setRooms,
        loading,
        users,
        socket,
        rooms,
        changeMessageRoom,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default PrivateRouter;
