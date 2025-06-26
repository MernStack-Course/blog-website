import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import { AuthProvider } from "../context/auth";
import App from "../App";
import CreatePost from "../pages/CreatePost";
import ProtectedRoute from "../pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [

        {
            path:'/', 
            element: <Home />
        },
       
      {
        path: "create-post",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/signup",
    element: (
      <AuthProvider>
        {" "}
        <SignUp />{" "}
      </AuthProvider>
    ),
  },

  {
    path: "/signin",
    element: (
      <AuthProvider>
        {" "}
        <SignIn />{" "}
      </AuthProvider>
    ),
  },

  {
    path: "*",
    element: <Home />,
  },
]);

export default router;
