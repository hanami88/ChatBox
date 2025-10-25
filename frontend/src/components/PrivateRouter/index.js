import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext.js";
function PrivateRouter({ children, user, loading, users }) {
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
    <UserContext.Provider value={{ user, loading, users }}>
      {children}
    </UserContext.Provider>
  );
}

export default PrivateRouter;
