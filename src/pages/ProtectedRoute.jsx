import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') ? true : false);
  return <div> 
     {isAuth ? children : <Navigate to="/signin" />}
  </div>;
}

export default ProtectedRoute;
