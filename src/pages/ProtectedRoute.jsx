import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";

function ProtectedRoute({ children }) {
  const {isAuth} = useAuthContext();
  return <div> 
     {isAuth ? children : <Navigate to="/signin" />}
  </div>;
}

export default ProtectedRoute;
