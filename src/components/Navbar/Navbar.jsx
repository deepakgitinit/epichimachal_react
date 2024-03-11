import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const open = () => {
    setMenu(!menu);
    removeMenu();
  };

  const removeMenu = () => {
    const menuBar = document.getElementById("menubar");
    if (menu) {
      setTimeout(() => {
        menuBar.classList.add("hidden");
      }, 100);
    } else {
      menuBar.classList.remove("hidden");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center text-sm mx-8 my-4">
        <div className="flex">
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
            <button className="text-slate-100 bg-slate-800 rounded-md px-4 py-2 
            hover:bg-slate-700 transition-colors">
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

        <motion.div
          id="menubar"
          animate={{ x: menu ? 0 : 200 }}
          className={`hidden lg:hidden absolute right-8 top-16 bg-slate-900 text-slate-100 p-4 rounded-md text-base z-50`}
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
            <hr style={{marginTop: "2rem"}}/>
            <Link to="/login">Log In</Link>
            <Link to="/signup">
              <button className="text-slate-800 bg-slate-100 rounded-md px-4 py-2 transition-colors">
                Sign Up
              </button>
            </Link>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
