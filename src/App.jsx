
import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/auth";

function App() {
  const {signOut, isAuth, userData} = useAuthContext();

  return (
    <>
      <ToastContainer />
      <nav className="w-full flex bg-white items-center sticky  top-0 z-50 justify-between px-4 py-2 shadow">
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
        {isAuth ? (
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
              {userData.current && userData.current.email.slice(0, 1)}
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
