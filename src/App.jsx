import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(() => JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <>
      <ToastContainer />
      <nav className="w-full flex items-center justify-between ">
        <div>
          <Link to="/">Home</Link>
          <Link to="/post">Posts</Link>
          <Link to="/create-post">Create Post</Link>
        </div>
        <a href="#">{user&& user.email}</a>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
