
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(()=>{
      let userData = localStorage.getItem('user');
      setUser(JSON.parse(userData))
  }, [])


   const signOut = () => {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      setUser(null)
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
 


  return (
    <>
      <ToastContainer />
      <nav className="w-full flex items-center justify-between px-4 py-2 shadow">
        <div className="flex items-center gap-6">
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            to="/post"
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            to="/create-post"
          >
            Create Post
          </NavLink>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={signOut}
              className="border cursor-pointer border-blue-500 hover:bg-blue-600 hover:text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out"
            >
              SignOut
            </button>
            <a
              href="#"
              className="w-10 h-10 bg-blue-600 text-white text-xl font-bold rounded-full flex items-center justify-center uppercase"
            >
              {user && user.email.slice(0, 1)}
            </a>
          </div>
        ) : (
          <Link
            to="/signIn"
            className="border cursor-pointer border-blue-500 hover:bg-blue-600 hover:text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out"
          >
            SignIn
          </Link>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default App;
