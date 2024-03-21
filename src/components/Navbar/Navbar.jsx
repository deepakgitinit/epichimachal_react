import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);

  const {role, profileImg, isAuthenticated, logout } = useAuth();

  const open = () => {
    setMenu(!menu);
  };

  const openMenu = () =>{
    setProfile(!profile)
  }

  if (isAuthenticated()) {
    return (
      <>
        <div className="flex justify-between items-center text-sm mx-8 my-4">
          <div className="flex">
            <img
              className="lg:hidden w-8 mr-2"
              src={`/menu${menu ? "_open" : ""}.svg`}
              alt="Menu"
              onClick={open}
            />
            <Link to={"/"}><img
              className="invert w-36 h-auto mr-4 "
              src="/Logo.png"
              alt="Logo"
            /></Link>
          </div>
          <ul className="lg:flex items-center *:mx-2 hover:*:text-gray-400 hover:*:transition-colors *:transition-colors hidden">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/destinations">Destinations</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <div className="flex items-center *:mx-2 ">
            {/* <img
              className="hover:contrast-50 cursor-pointer lg:block hidden"
              src="/search.svg"
              alt=""
            /> */}
            <div onClick={openMenu} >
              <img
                className="size-10 rounded-full cursor-pointer object-cover"
                src={profileImg}
                alt="profile"
              />
            </div>
          </div>

         <div className={`${profile?"":"hidden"} bg-slate-900 text-slate-100 text-base right-8 top-20 rounded-md absolute z-50 py-4 px-2 min-w-28`}>
          <ul className="*:m-2 *:cursor-pointer text-sm md:hover:*:text-base md:*:transition-all" onClick={openMenu} >
            {role=="ADMIN"?<li><Link to={"/admin"} >Admin</Link></li>:""}
            <li><Link to={"/dashboard"} >Dashboard</Link></li>
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><Link to={"/settings"}>Settings</Link></li>
            <li onClick={logout}>Logout</li>
          </ul>
         </div>

          <div
            id="menubar"
            className={`${menu?"":"hidden"} lg:hidden absolute left-8 top-20 bg-slate-900 text-slate-100 p-4 rounded-md text-base z-50`}
          >
            <ul className="text-sm *:mx-2 *:my-3 hover:*:text-gray-400 hover:*:transition-colors" onClick={open}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/packages">Packages</Link>
              </li>
              <li>
                <Link to="/destinations">Destinations</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  } else {

    return (
      <>
        <div className="flex justify-between items-center text-sm mx-8 my-4">
          <div className="flex">
            <Link to={"/"}><img
              className="invert w-36 h-auto mx-4"
              src="/Logo.png"
              alt="Epichimachal"
            /></Link>
          </div>

          <ul className="lg:flex items-center *:mx-2 hover:*:text-gray-400 hover:*:transition-colors hidden">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/destinations">Destinations</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <div className="lg:flex items-center *:mx-2 hidden">
            {/* <img
              className="hover:contrast-50 cursor-pointer"
              src="src\assets\search.svg"
              alt=""
            /> */}
            <Link
              className="hover:text-gray-400 hover:transition-colors"
              to="/login"
            >
              Login
            </Link>
            <Link to="/signup">
              <button
                className="text-slate-100 bg-slate-800 rounded-md px-4 py-2 
            hover:bg-slate-700 transition-colors"
              >
                Sign Up
              </button>
            </Link>
          </div>

          <img
            className="lg:hidden w-8"
            src={`/menu${menu ? "_open" : ""}.svg`}
            alt="Menu"
            onClick={open}
          />

          <div
            id="menubar"
            className={`${menu?"":"hidden"} lg:hidden absolute right-8 top-20 bg-slate-900 text-slate-100 p-4 rounded-md text-base z-50`}
          >
            <ul className=" *:mx-2 *:my-3 hover:*:text-gray-400 hover:*:transition-colors" onClick={open}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/packages">Packages</Link>
              </li>
              <li>
                <Link to="/destinations">Destinations</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <hr style={{ marginTop: "2rem" }} />
              <Link to="/login">Log In</Link>
              <Link to="/signup">
                <button className="text-slate-800 bg-slate-100 rounded-md px-4 py-2 transition-colors">
                  Sign Up
                </button>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  }
};

export { Navbar };
