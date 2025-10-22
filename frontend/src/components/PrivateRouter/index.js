import { Navigate } from "react-router-dom";

function PrivateRouter({ children, user }) {
  if (user === null) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }
  if (user === false) {
    return <Navigate to="/login-page" />;
  }
  return children;
}

export default PrivateRouter;
