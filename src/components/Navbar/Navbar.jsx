import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const { isAuthenticated, logout } = useAuth();

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
              src={`src/assets/menu${menu ? "_open" : ""}.svg`}
              alt="Menu"
              onClick={open}
            />
            <img
              className="invert w-36 h-auto mr-4"
              src="src\assets\Logo.png"
              alt=""
            />
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
          <div className="flex items-center *:mx-2 ">
            <img
              className="hover:contrast-50 cursor-pointer lg:block hidden"
              src="src\assets\search.svg"
              alt=""
            />
            <div onClick={openMenu}>
              <img
                className="h-10 w-auto rounded-full cursor-pointer"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                alt=""
              />
            </div>
          </div>

         <div className={`${profile?"":"hidden"} bg-slate-900 text-slate-100 text-base right-8 top-20 rounded-md absolute z-50 py-4 px-2`}>
          <ul className="*:m-2 *:cursor-pointer" onClick={openMenu}>
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
            <ul className=" *:mx-2 *:my-3 hover:*:text-gray-400 hover:*:transition-colors" onClick={openMenu}>
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
            <img
              className="invert w-36 h-auto mx-4"
              src="src\assets\Logo.png"
              alt=""
            />
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
            <img
              className="hover:contrast-50 cursor-pointer"
              src="src\assets\search.svg"
              alt=""
            />
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
            src={`src/assets/menu${menu ? "_open" : ""}.svg`}
            alt="Menu"
            onClick={open}
          />

          <div
            id="menubar"
            className={`${menu?"":"hidden"} lg:hidden absolute right-8 top-20 bg-slate-900 text-slate-100 p-4 rounded-md text-base z-50`}
          >
            <ul className=" *:mx-2 *:my-3 hover:*:text-gray-400 hover:*:transition-colors">
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
