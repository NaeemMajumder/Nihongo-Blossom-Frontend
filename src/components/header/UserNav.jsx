import React, { useContext } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const UserNav = () => {

  let { user,logOutUser } = useContext(AuthContext);
  let navigate = useNavigate();

  let handleLogOut = ()=>{
    logOutUser().then(()=>{
      navigate("/login")
      toast.success("You are Logged Out")
    }).catch((error)=>toast.error(error.message));
  }

  return (
    <>
      <nav>
        <div className="navbar max-w-[1350px] m-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to={"/lessons"}>lessons</NavLink>
                </li>
                <li>
                  <NavLink to={"/tutorials"}>tutorials</NavLink>
                </li>
              </ul>
            </div>
            <a href="/lessons" className="btn btn-ghost text-2xl text-[#4CB78B]">
              Nihongo Blossom
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">
              <li>
                <NavLink to={"/lessons"}>lessons</NavLink>
              </li>
              <li>
                <NavLink to={"/tutorials"}>tutorials</NavLink>
              </li>
            </ul>
          </div>

          <div className="navbar-end gap-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle overflow-hidden"
              >
                <div className="indicator">
                  <img src={user?.photoURL?user.photoURL:"/images/avter.jpg"} alt="" />
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">{user?.displayName}</span>
                  <span className="text-info">{user?.email}</span>
                  <div className="card-actions flex flex-col space-y-2">
                    <Link className="w-full" to='/myProfile'>
                    <button className="w-full py-2 px-6 text-white font-semibold text-lg rounded-lg bg-[#3AB092] hover:scale-105 transform transition-all duration-300">
                      Your Profile
                    </button>                    
                    </Link>

                    <button onClick={handleLogOut} className="w-full py-2 px-6 text-white font-semibold text-lg rounded-lg bg-gradient-to-br from-[#164193] to-[#00a9ff] hover:scale-105 transform transition-all duration-300 lg:hidden">
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleLogOut} className="hidden lg:inline-block py-2 px-6 text-white font-semibold text-lg rounded-lg bg-gradient-to-br from-[#164193] to-[#00a9ff] hover:scale-105 transform transition-all duration-300">
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNav;
